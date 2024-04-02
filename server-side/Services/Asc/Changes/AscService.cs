using PrettyTimetable.Abstractions.Stable;
using PrettyTimetable.Core;
using Repository.Database;
using System.Xml;

namespace Services.Asc.Changes
{
    public class AscService(TimetableContext timetableContext) : IAscService
    {
        public async Task<ServiceResult> ImportTimetablesAsync(string path, CancellationToken cancellationToken = default)
        {
            var converter = new Timetable.Converter(timetableContext);
            await converter.ConvertAndSaveAsync(path, cancellationToken);
            return ServiceResult.Ok("Расписание было импортировано.");
        }

        public async Task<ServiceResult> ImportTimetablesAsync(Stream stream, CancellationToken cancellationToken = default)
        {
            var converter = new Timetable.Converter(timetableContext);
            var reader = XmlReader.Create(stream);
            await converter.ConvertAndSaveAsync(reader, cancellationToken);
            stream.Dispose();
            return ServiceResult.Ok("Расписание было импортировано.");
        }
        public async Task<ServiceResult> ImportSubstitationsAsync(string path, CancellationToken cancellationToken = default)
        {
            var converter = new ChangesConverter(timetableContext);
            await converter.ConvertAndSaveAsync(path, cancellationToken);
            return ServiceResult.Ok("Замены были импортированы.");
        }

        public async Task<ServiceResult> ImportSubstitationsAsync(Stream stream, CancellationToken cancellationToken = default)
        {
            var converter = new ChangesConverter(timetableContext);
            var reader = XmlReader.Create(stream);
            await converter.ConvertAndSaveAsync(reader, cancellationToken);
            stream.Dispose();
            return ServiceResult.Ok("Замены были импортированы.");
        }

    }
}
