﻿using Models.Request.CardParts;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace Mappers.CardParts
{
    public static class SubjectMapper
    {
        public static Subject ToEntity(this SubjectModels.SubjectPut model)
        {
            return new()
            {
                Id = model.Id,
                Name = model.Name,
                ModifiedAt = DateTime.UtcNow,
                AscId = string.IsNullOrWhiteSpace(model.AscId) ? null : model.AscId,
            };
        }
    }
}
