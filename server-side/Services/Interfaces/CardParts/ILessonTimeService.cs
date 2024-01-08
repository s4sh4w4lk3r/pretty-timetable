using Repository.Entities.Timetable.Cards.Parts;

namespace Services.Interfaces.CardParts
{
    public interface ILessonTimeService
    {
        public Task<ServiceResult<int>> PutAsync(LessonTime lessonTime, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
