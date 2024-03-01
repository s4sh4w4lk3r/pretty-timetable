using Repository.Entities.Timetable.Cards.Info;

namespace Services.Interfaces.CardParts
{
    public interface ILessonTimeService
    {
        public Task<ServiceResult<int>> PutAsync(LessonTime lessonTime, CancellationToken cancellationToken = default);
        public Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default);
    }
}
