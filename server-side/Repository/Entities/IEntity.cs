namespace Repository.Entities
{
    internal interface IEntity
    {
        int Id { get; }
        DateTime CreatedAt { get; }
        DateTime UpdatedAt { get; }
    }
}
