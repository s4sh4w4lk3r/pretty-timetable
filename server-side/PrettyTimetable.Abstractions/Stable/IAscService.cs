using PrettyTimetable.Core;

namespace PrettyTimetable.Abstractions.Stable
{
    public interface IAscService
    {
        [Obsolete] public Task<ServiceResult> ImportSubstitationsAsync(Stream stream, CancellationToken cancellationToken = default);
        [Obsolete] public Task<ServiceResult> ImportSubstitationsAsync(string path, CancellationToken cancellationToken = default);
        public Task<ServiceResult> ImportTimetablesAsync(Stream stream, CancellationToken cancellationToken = default);
        public Task<ServiceResult> ImportTimetablesAsync(string path, CancellationToken cancellationToken = default);
    }
}