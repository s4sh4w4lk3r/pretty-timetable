using System.ComponentModel.DataAnnotations;

namespace Models.Request.CardParts
{
    public static class LessonTimeModels
    {

        public class LessonTimePut
        {
            private const string TIME_REGEX = "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";
            private const string REGEX_ERROR_MSG = "Время должно иметь формат HH:MM";
            public required int Id { get; init; }
            [Required] public required int Number { get; init; }
            [Required, RegularExpression(TIME_REGEX, ErrorMessage = REGEX_ERROR_MSG)] public required string StartsAt { get; init; }
            [Required, RegularExpression(TIME_REGEX, ErrorMessage = REGEX_ERROR_MSG)] public required string EndsAt { get; init; }
        }
    }
}
