using Repository.Database;

namespace Services.AcutalTimetables
{
    public class ActualTimetableService(TimetableContext timetableContext)
    {
        /// <summary>
        /// Проецирует расписание всех групп, на указанные даты в массиве.
        /// </summary>
        /// <returns></returns>
        public async Task<ServiceResult> StableToActual(IEnumerable<DateOnly> dates)
        {
            var projectorResult = await new TimetableProjector(timetableContext).Project(dates);
            if (projectorResult.Success is false)
            {
                return ServiceResult.Fail("Расписание не спроецировалось.", projectorResult);
            }

            return ServiceResult.Ok("Расписание спроецировалось успешно.");
        }
    }
}
