using Repository.Database;
using System.Xml;

namespace Services.Asc
{
    public class AscService(TimetableContext timetableContext)
    {
        public async Task ImportTimetables(string path, CancellationToken cancellationToken = default)
        {
            var converter = new Asc.Timetable.Converter(timetableContext);
            await converter.ConvertAndSaveAsync(path, cancellationToken);
        }

        public async Task ImportTimetables(Stream stream, CancellationToken cancellationToken = default)
        {
            var converter = new Asc.Timetable.Converter(timetableContext);
            var reader = XmlReader.Create(stream);
            await converter.ConvertAndSaveAsync(reader, cancellationToken);
            stream.Dispose();
        }
        public async Task ImportSubstitations(string path, CancellationToken cancellationToken = default)
        {
            var converter = new Asc.Changes.ChangesConverter(timetableContext);
            await converter.ConvertAndSaveAsync(path, cancellationToken);
        }

        public async Task ImportSubstitations(Stream stream, CancellationToken cancellationToken = default)
        {
            var converter = new Asc.Changes.ChangesConverter(timetableContext);
            var reader = XmlReader.Create(stream);
            await converter.ConvertAndSaveAsync(reader, cancellationToken);
            stream.Dispose();
        }

    }
}
