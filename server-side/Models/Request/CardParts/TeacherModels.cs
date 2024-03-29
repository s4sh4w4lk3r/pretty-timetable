﻿using System.ComponentModel.DataAnnotations;

namespace Models.Request.CardParts
{
    public static class TeacherModels
    {
        public class TeacherPut
        {
            public int Id { get; init; }
            [Required] public required string Lastname { get; init; }
            [Required] public required string Firstname { get; init; }
            public required string Middlename { get; init; }
            public string AscId { get; init; } = string.Empty;

        }
    }
}
