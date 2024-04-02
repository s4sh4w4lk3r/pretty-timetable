using Microsoft.EntityFrameworkCore;
using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable;
using PrettyTimetable.Core.Entities.Timetable.Cards;
using Repository.Database;

using System.Globalization;

namespace Services.AcutalTimetables
{
    internal class TimetableProjector(TimetableContext timetableContext)
    {
        private readonly List<ActualTimetable> actualTimetables = [];
        private readonly List<StableTimetable> stableTimetables = timetableContext.StableTimetables.Include(e => e.Cards).ToList();

        public async Task<ServiceResult> Project(IEnumerable<DateOnly> dates, CancellationToken cancellationToken = default)
        {
            var checkDatesResult = CheckDates(dates);
            if (checkDatesResult.Success is false || checkDatesResult.Value == -1)
            {
                return ServiceResult.Fail("Невалидные даты были получены прожектором").AddInnerResult(checkDatesResult);
            }


            foreach (var timetable in stableTimetables)
            {
                var newActualTimetable = new ActualTimetable()
                {
                    Id = default,
                    GroupId = timetable.Id,
                    WeekNumber = checkDatesResult.Value,
                    Cards = [],
                    ModifiedAt = DateTime.UtcNow
                };

                foreach (var date in dates)
                {
                    foreach (var card in timetable.Cards!.Where(e => e.IsWeekEven == (checkDatesResult.Value % 2 == 0) && e.DayOfWeek == date.DayOfWeek))
                    {
                        newActualTimetable.Cards.Add(ProjectCard(card, date, timetable.Id));
                    }
                }

                actualTimetables.Add(newActualTimetable);
            }

            await timetableContext.ActualTimetables.AddRangeAsync(actualTimetables,cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);
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

            if (dates is null || dates.Any() is false)
            {
                return ServiceResult<int>.Fail("Массив с датами пустой или нулл.", WEEK_NUMBER_IF_ERROR);
            }

            dates = dates.Distinct().Order();

/*            if (dates.First() < DateOnly.FromDateTime(DateTime.UtcNow))
            {
                return ServiceResult<int>.Fail("Даты не долнжы указывать на прошедшее время.", WEEK_NUMBER_IF_ERROR);
            }*/

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

        private static ActualCard ProjectCard(StableCard stableCard, DateOnly date, int relatedTimetableId)
        {
            return new ActualCard()
            {
                Id = default,
                IsCanceled = false,
                IsModified = false,
                IsMoved = false,
                RoomId = stableCard.RoomId,
                LessonTimeId = stableCard.LessonTimeId,
                SubGroup = stableCard.SubGroup,
                SubjectId = stableCard.SubjectId,
                TeacherId = stableCard.TeacherId,
                RelatedTimetableId = relatedTimetableId,
                Date = date,
                ModifiedAt = DateTime.UtcNow
            };
        }
    }
}
