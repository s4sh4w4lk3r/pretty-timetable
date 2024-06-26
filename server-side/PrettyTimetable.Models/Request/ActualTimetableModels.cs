﻿using System.ComponentModel.DataAnnotations;

namespace Models.Request
{
    public class ActualTimetableModels
    {
        public record class StableToActual(List<string> Dates);

        public class ActualTimetablePut
        {
            public int Id { get; init; }
            public int GroupId { get; set; }
            [Range(1, 53)]public int WeekNumber { get; set; }
        }
    }
}
