namespace Repository
{
    public interface IEntity
    {
        int Id { get; }
        DateTime CreatedAt { get; }
        DateTime UpdatedAt { get; }
    }
}
