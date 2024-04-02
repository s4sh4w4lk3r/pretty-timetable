using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace PrettyTimetable.Services.Asc.Timetable
{
    internal static class StaticDeterminers
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dayOfWeekCode"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public static DayOfWeek DetermineDayOfWeek(string dayOfWeekCode)
        {
            const string MONDAY_CODE = "10000";
            const string TUESDAY_CODE = "01000";
            const string WEDNESDAY_CODE = "00100";
            const string THURSDAY_CODE = "00010";
            const string FRIDAY_CODE = "00001";

            return dayOfWeekCode switch
            {
                MONDAY_CODE => DayOfWeek.Monday,
                TUESDAY_CODE => DayOfWeek.Tuesday,
                WEDNESDAY_CODE => DayOfWeek.Wednesday,
                THURSDAY_CODE => DayOfWeek.Thursday,
                FRIDAY_CODE => DayOfWeek.Friday,
                _ => throw new ArgumentException("День недели не определен.")
            };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="weekCode"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public static WeekEvenness DetermineWeekEvenness(string weekCode)
        {
            const string ANY_WEEK_CODE = "11";
            const string EVEN_WEEK_CODE = "10";
            const string ODD_WEEK_CODE = "01";

            return weekCode switch
            {
                ANY_WEEK_CODE => WeekEvenness.Both,
                EVEN_WEEK_CODE => WeekEvenness.Even,
                ODD_WEEK_CODE => WeekEvenness.Odd,
                _ => throw new ArgumentException("Тип недели не определен.")
            };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="subgroupCode"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public static SubGroup DetermineSubgroup(string subgroupCode)
        {
            return subgroupCode switch
            {
                "Весь класс" => SubGroup.All,
                "1 группа" => SubGroup.FirstGroup,
                "2 группа" => SubGroup.SecondGroup,
                "Мальчики" => SubGroup.Males,
                "Девочки" => SubGroup.Females,
                _ => throw new ArgumentException("Подгруппа не определена.")
            };
        }

        // В xmlке поле "кабиент" включает в себя несколько айдишников сразу, поэтому выбираю первый, который есть в бд.

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cabinets"></param>
        /// <param name="ascCabinetsStr"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentException"></exception>
        public static Room DetermineCabinets(IEnumerable<Room> cabinets, string ascCabinetsStr)
        {
            var ascCabinetsSplitted = ascCabinetsStr.Split(',');
            foreach (var ascCabinet in ascCabinetsSplitted)
            {
                var cabinet = cabinets.FirstOrDefault(e => e.AscId == ascCabinet);
                if (cabinet is not null)
                {
                    return cabinet;
                }
            }
            throw new ArgumentException("Нет соостветсвий между бд и xml-кой по кабинетам.");
        }

        public enum WeekEvenness { Both = 0, Even = 1, Odd = 2 }
    }
}
