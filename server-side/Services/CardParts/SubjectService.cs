using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;

namespace Services.CardParts
{
    public class SubjectService : ISubjectService
    {
        public async Task<ServiceResult> CreateAsync(Subject subject, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> UpdateAsync(Subject subject, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
