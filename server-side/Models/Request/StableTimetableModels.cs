namespace Models.Request
{
    public class StableTimetableModels
    {
        public class StableTimetableUpdate
        {
            public int Id { get; init; }
            public int GroupId { get; set; }
        }
        public class StableTimetableCreate
        {
            public int GroupId { get; set; }
        }
    }
}
