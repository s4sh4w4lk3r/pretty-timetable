using System.ComponentModel.DataAnnotations;

namespace Models.Request
{
    public static class ActualCardModels
    {
        public class ActualCardPut
        {
            private const string DATE_REGEX = "^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)" +
                "(?:0?[13-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?" +
                "(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)" +
                "(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$";
            private const string REGEX_ERROR_MSG = "Дата должна иметь формат dd/mm/yyyy, dd-mm-yyyy или dd.mm.yyyy";

            public int Id { get; init; }
            public int RoomId { get; init; }
            public bool IsCanceled { get; init; }
            public bool IsModified { get; init; }
            public bool IsMoved { get; init; }
            public int LessonTimeId { get; init; }
            public int SubGroup { get; init; }
            public int SubjectId { get; init; }
            public int TeacherId { get; init; }
            public int RelatedTimetableId { get; init; }
            [Required, RegularExpression(DATE_REGEX, ErrorMessage = REGEX_ERROR_MSG)] public required string Date { get; init; }
        }
    }
}
