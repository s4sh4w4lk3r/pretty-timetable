using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;

namespace Services.CardParts
{
    public class CabinetService : ICabinetService
    {
        public async Task<ServiceResult> CreateAsync(Cabinet cabinet, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> UpdateAsync(Cabinet cabinet, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
