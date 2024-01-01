namespace Services.Interfaces
{
    public interface IActualTimetableService
    {
        Task<ServiceResult> StableToActual(IEnumerable<DateOnly> dates);
    }
}