namespace Services.Interfaces
{
    public interface IAscService
    {
        public Task<ServiceResult> ImportSubstitations(Stream stream, CancellationToken cancellationToken = default);
        public Task<ServiceResult> ImportSubstitations(string path, CancellationToken cancellationToken = default);
        public Task<ServiceResult> ImportTimetables(Stream stream, CancellationToken cancellationToken = default);
        public Task<ServiceResult> ImportTimetables(string path, CancellationToken cancellationToken = default);
    }
}