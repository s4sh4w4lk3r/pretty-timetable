using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable;
using Repository.Entities.Timetable.Cards;
using System.Globalization;

namespace Services.AcutalTimetables
{
    public class ActualTimetableService(TimetableContext timetableContext)
    {
        public async Task<ServiceResult> Foo(IEnumerable<DateOnly> dates)
        {
            var stableTimetables = timetableContext.StableTimetables.Include(e => e.Cards);
            var actualTimetables = new List<ActualTimetable>();

            var checkDatesResult = CheckDates(dates);
            if ((checkDatesResult.Success is false) || (checkDatesResult.Value == -1))
            {
                return checkDatesResult;
            }

            foreach (var timetable in stableTimetables)
            {
                var newActualTimetable = new ActualTimetable()
                {
                    CreatedAt = DateTime.UtcNow,
                    GroupId = timetable.Id,
                    WeekNumber = checkDatesResult.Value,
                    Cards = []
                };

                foreach (var date in dates)
                {
                    foreach (var card in timetable.Cards.Where(e=>e.IsWeekEven == (checkDatesResult.Value % 2 == 0) && e.DayOfWeek == date.DayOfWeek))
                    {
                        newActualTimetable.Cards.Add(GetActualCard(card, date, timetable.Id));
                    }
                }

                actualTimetables.Add(newActualTimetable);
            }

            await timetableContext.ActualTimetables.AddRangeAsync(actualTimetables);
            await timetableContext.SaveChangesAsync();
            return ServiceResult.Ok("Расписание для всех групп добавлено.");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dates"></param>
        /// <returns>Возвращает номер недели, если все ок, если произошла ошибка, то значение будет -1.</returns>
        private static ServiceResult<int> CheckDates(IEnumerable<DateOnly> dates)
        {
            const int WEEK_NUMBER_IF_ERROR = -1;

            if ((dates is null) || (dates.Any() is false))
            {
                return ServiceResult<int>.Fail("Массив с датами пустой или нулл.", WEEK_NUMBER_IF_ERROR);
            }

            dates = dates.Distinct().Order();

            if (dates.First() < DateOnly.FromDateTime(DateTime.UtcNow))
            {
                return ServiceResult<int>.Fail("Даты не долнжы указывать на прошедшее время.", WEEK_NUMBER_IF_ERROR);
            }

            int weekNumber = ISOWeek.GetWeekOfYear(dates.First().ToDateTime(TimeOnly.MinValue));

            foreach (var date in dates)
            {
                {
                    int currentWeekNumber = ISOWeek.GetWeekOfYear(date.ToDateTime(TimeOnly.MinValue));
                    if (currentWeekNumber != weekNumber)
                    {
                        return ServiceResult<int>.Fail("Передан массив дат, которые указывают на разные недели", WEEK_NUMBER_IF_ERROR);
                    }
                }
            }

            return ServiceResult<int>.Ok("Ок", weekNumber);
        }
        private static ActualCard GetActualCard(StableCard stableCard, DateOnly date, int relatedTimetableId)
        {
            return new ActualCard()
            {
                IsCanceled = false,
                IsModified = false,
                IsMoved = false,
                CabinetId = stableCard.CabinetId,
                LessonTimeId = stableCard.LessonTimeId,
                SubGroup = stableCard.SubGroup,
                SubjectId = stableCard.SubjectId,
                TeacherId = stableCard.TeacherId,
                RelatedTimetableId = relatedTimetableId,
                Date = date,
                CreatedAt = DateTime.UtcNow
            };
        }
    }
}
