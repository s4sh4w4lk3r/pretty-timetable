using PrettyTimetable.Core;
using PrettyTimetable.Services.AcutalTimetables;
namespace PrettyTimetable.Tests
{
    public class CheckDatesTests
    {
        [Theory]
        [InlineData(true, "15.04.2024", "16.04.2024", "17.04.2024", "18.04.2024", "19.04.2024")]
        [InlineData(true, "15.04.2024", "15.04.2024", "16.04.2024", "18.04.2024", "19.04.2024")]
        [InlineData(false, "20.04.2024", "21.04.2024", "22.04.2024", "23.04.2024", "24.04.2024")]
        [InlineData(false, "2024.04.13", "2024.04.14", "2024.04.15", "2024.04.16", "2024.04.17")]
        public void CheckDates(bool expected, params string[] datesOnlyStr)
        {
            IEnumerable<DateOnly> dates = datesOnlyStr.Select(DateOnly.Parse);
            ServiceResult<int> result = TimetableProjector.CheckDates(dates);
            Assert.Equal(expected, (result.Value != 1) && (result.Success is true));
        }
    }
}