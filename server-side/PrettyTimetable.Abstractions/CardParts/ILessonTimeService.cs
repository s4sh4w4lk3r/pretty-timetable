using PrettyTimetable.Core;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace PrettyTimetable.Abstractions.CardParts
{
    public interface ILessonTimeService
    {
        public Task<ServiceResult<int>> PutAsync(LessonTime lessonTime, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
