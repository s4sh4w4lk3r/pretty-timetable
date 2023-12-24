using Repository.Database;
using Repository.Entities.Timetable;
using Services.Extensions;
using System.Globalization;

namespace Services.AcutalTimetables
{
    public class ActualTimetableService(TimetableContext timetableContext)
    {
        public ServiceResult Foo(IEnumerable<DateOnly> dates)
        {

        }

        private static ServiceResult CheckDates(IEnumerable<DateOnly> dates)
        {
            if (dates.Any() is false)
            {
                return ServiceResult.Fail("Массив с датами пустой.");
            }

            dates = dates.Distinct().Order();

            if (dates.First() < DateOnly.FromDateTime(DateTime.UtcNow))
            {
                return ServiceResult.Fail("Даты не долнжы указывать на прошедшее время.");
            }

            int weekNumber = ISOWeek.GetWeekOfYear(dates.First().ToDateTime(TimeOnly.MinValue));

            foreach (var date in dates)
            {
                {
                    int currentWeekNumber = ISOWeek.GetWeekOfYear(date.ToDateTime(TimeOnly.MinValue));
                    if (currentWeekNumber != weekNumber)
                    {
                        return ServiceResult.Fail("Передан массив дат, которые указывают на разные недели");
                    }
                }
            }

            return ServiceResult.Ok("Ок");
        }
        private void AddTimetableByDate(StableTimetable stableTimetable, DateOnly date)
        {
            DayOfWeek dayOfWeek = date.DayOfWeek;
            bool isEven = date.IsWeekEven();

            foreach (var item in stableTimetable.Cards)
            {
#error
            }
        }
    }
}
