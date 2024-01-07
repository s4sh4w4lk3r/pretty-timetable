using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;

namespace Services.CardParts
{
    public class LessonTimeService : ILessonTimeService
    {
        public async Task<ServiceResult> CreateAsync(LessonTime lessonTime, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> UpdateAsync(LessonTime lessonTime, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
