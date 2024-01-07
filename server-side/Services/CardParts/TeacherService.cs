using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;

namespace Services.CardParts
{
    public class TeacherService : ITeacherService
    {
        public async Task<ServiceResult> CreateAsync(Teacher teacher, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> UpdateAsync(Teacher teacher, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
