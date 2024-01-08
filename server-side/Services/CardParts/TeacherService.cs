﻿using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Services.Interfaces.CardParts;
using Validation.Entities.CardParts;

namespace Services.CardParts
{
    public class TeacherService(TimetableContext timetableContext) : ITeacherService
    {
        public async Task<ServiceResult<int>> PutAsync(Teacher teacher, CancellationToken cancellationToken = default)
        {
            var valResult = new TeacherValidator().Validate(teacher);
            if (valResult.IsValid is false)
            {
                return ServiceResult.Fail(valResult.ToString(), default(int));
            }

            timetableContext.Teachers.Update(teacher);

            var queryResult = await timetableContext.SaveChangesAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.PutError, default(int)).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Putted, teacher.Id).AddInnerResult(queryResult);
        }

        public async Task<ServiceResult> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            var queryResult = await timetableContext.Teachers.Where(e => e.Id == id).ExecuteDeleteAsync(cancellationToken).HandleQuery();
            if (queryResult.Success is false)
            {
                return ServiceResult.Fail(ResultMessages.DeleteError).AddInnerResult(queryResult);
            }

            return ServiceResult.Ok(ResultMessages.Deleted).AddInnerResult(queryResult);
        }
    }
}