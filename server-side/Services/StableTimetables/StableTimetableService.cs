using Repository.Entities.Timetable;
using Services.Interfaces.Stable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.StableTimetables
{
    public class StableTimetableService : IStableTimetableService
    {
        public async Task<ServiceResult> CreateAsync(StableTimetable stableTimetable)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> UpdateAsync(StableTimetable stableTimetable)
        {
            throw new NotImplementedException();
        }
    }
}
