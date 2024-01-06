namespace Models.Request
{
    public class ActualTimetableModels
    {
        public record class StableToActual(List<string> Dates);

        public class ActualTimetableCreate
        {
            public int GroupId { get; set; }
            public int WeekNumber { get; set; }

        }

        public class ActualTimetableUpdate
        {
            public int Id { get; init; }
            public int GroupId { get; set; }
            public int WeekNumber { get; set; }

        }
    }
}
