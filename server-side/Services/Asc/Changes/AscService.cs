using Repository.Database;
using Services.Interfaces.Stable;
using System.Xml;

namespace Services.Asc.Changes
{
    public class AscService(TimetableContext timetableContext) : IAscService
    {
        public async Task<ServiceResult> ImportTimetables(string path, CancellationToken cancellationToken = default)
        {
            var converter = new Timetable.Converter(timetableContext);
            await converter.ConvertAndSaveAsync(path, cancellationToken);
            return ServiceResult.Ok("Расписание было импортировано.");
        }

        public async Task<ServiceResult> ImportTimetables(Stream stream, CancellationToken cancellationToken = default)
        {
            var converter = new Timetable.Converter(timetableContext);
            var reader = XmlReader.Create(stream);
            await converter.ConvertAndSaveAsync(reader, cancellationToken);
            stream.Dispose();
            return ServiceResult.Ok("Расписание было импортировано.");
        }
        public async Task<ServiceResult> ImportSubstitations(string path, CancellationToken cancellationToken = default)
        {
            var converter = new ChangesConverter(timetableContext);
            await converter.ConvertAndSaveAsync(path, cancellationToken);
            return ServiceResult.Ok("Замены были импортированы.");
        }

        public async Task<ServiceResult> ImportSubstitations(Stream stream, CancellationToken cancellationToken = default)
        {
            var converter = new ChangesConverter(timetableContext);
            var reader = XmlReader.Create(stream);
            await converter.ConvertAndSaveAsync(reader, cancellationToken);
            stream.Dispose();
            return ServiceResult.Ok("Замены были импортированы.");
        }

    }
}
