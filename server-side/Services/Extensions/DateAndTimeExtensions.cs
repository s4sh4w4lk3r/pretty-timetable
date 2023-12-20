using System.Globalization;

namespace Extenstions
{
    public static class DateAndTimeExtensions
    {
        public static bool IsWeekEven(this DateOnly dateOnly)
        {
            DateTime dateTime = dateOnly.ToDateTime(TimeOnly.MinValue);
            int week = ISOWeek.GetWeekOfYear(dateTime);
            return week % 2 == 0;
        }
    }
}
