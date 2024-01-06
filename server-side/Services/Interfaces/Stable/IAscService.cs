namespace Services.Interfaces.Stable
{
    public interface IAscService
    {
        public Task<ServiceResult> ImportSubstitationsAsync(Stream stream, CancellationToken cancellationToken = default);
        public Task<ServiceResult> ImportSubstitationsAsync(string path, CancellationToken cancellationToken = default);
        public Task<ServiceResult> ImportTimetablesAsync(Stream stream, CancellationToken cancellationToken = default);
        public Task<ServiceResult> ImportTimetablesAsync(string path, CancellationToken cancellationToken = default);
    }
}