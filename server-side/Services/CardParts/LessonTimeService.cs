﻿using Microsoft.EntityFrameworkCore;
using Npgsql;
using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;

namespace Services.CardParts
{
    public class LessonTimeService(TimetableContext timetableContext) : ILessonTimeService
    {
        public async Task<ServiceResult> CreateAsync(LessonTime lessonTime, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            try
            {
                await timetableContext.LessonTimes.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken);
                return ServiceResult.Ok("Урок удален.");
            }
            catch (PostgresException ex) when (ex.SqlState == PostgresErrorCodes.ForeignKeyViolation)
            {
                return ServiceResult.Fail("Урок не удален, поскольку на него ссылается какая-то сущность.");
            }
        }

        public async Task<ServiceResult> UpdateAsync(LessonTime lessonTime, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
