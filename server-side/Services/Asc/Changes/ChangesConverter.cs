using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Services.Asc.Timetable;
using System.Runtime.Serialization;
using System.Xml;
using System.Xml.Serialization;

namespace Services.Asc.Changes
{
    internal class ChangesConverter(TimetableContext timetableContext)
    {

        private Substitutions _substitutions = null!;

        public async Task ConvertAndSaveAsync(XmlReader xmlReader, CancellationToken cancellationToken = default)
        {
            var serializer = new XmlSerializer(typeof(Substitutions));
            _substitutions = serializer.Deserialize(xmlReader) as Substitutions ?? throw new SerializationException();

            xmlReader.Dispose();

            await StartConverting(cancellationToken);
        }

        public async Task ConvertAndSaveAsync(string path, CancellationToken cancellationToken = default)
        {
            var serializer = new XmlSerializer(typeof(Substitutions));
            var xmlReader = XmlReader.Create(path);
            _substitutions = serializer.Deserialize(xmlReader) as Substitutions ?? throw new SerializationException();

            xmlReader.Dispose();

            await StartConverting(cancellationToken);
        }

        private async Task StartConverting(CancellationToken cancellationToken = default)
        {
            var date = new DateOnly(_substitutions.Date.Year, _substitutions.Date.Month, _substitutions.Date.Day);
            var substs = _substitutions.Date.Subst;

            var teachersFromRepo = await timetableContext.Teachers.ToListAsync(cancellationToken);
            var subjectsFromRepo = await timetableContext.Subjects.ToListAsync(cancellationToken); ;
            var lessonTimesFromRepo = await timetableContext.LessonTimes.ToListAsync(cancellationToken);
            var cabinetsFromRepo = await timetableContext.Cabinets.ToListAsync(cancellationToken);
            var groupsFromRepo = await timetableContext.Groups.ToListAsync(cancellationToken);
            var actualCards = await timetableContext.ActualCards.ToListAsync(cancellationToken);

            foreach (var subst in substs)
            {
                var group = groupsFromRepo.Single(e => e.Name == subst.Forms);
                var subgroup = StaticDeterminers.DetermineSubgroup(subst.Groups);
                var subject = subjectsFromRepo.First(e => e.Name == subst.Subject);
                var lessonTime = lessonTimesFromRepo.Single(e => e.Number == subst.Lesson);
                var abusent = teachersFromRepo.Single(e => e.Lastname + " " + e.Firstname == subst.Absent); //отсутсвующий
                var substituting = teachersFromRepo.Single(e => e.Lastname + " " + e.Firstname == subst.Absent);  // заменяющий
                var cabinet = cabinetsFromRepo.Single(e => e.FullName == subst.Room);

                // Возможно, здесь какая-то проблема.
                var actualCard = actualCards.Single(e => e.Date == date && e.LessonTime!.Number == lessonTime.Number && e.RelatedTimetable!.GroupId == group.Id);
                actualCard.IsModified = true;
                actualCard.TeacherId = substituting.Id;
                actualCard.Cabinet = cabinet;

            }
        }
    }
}
