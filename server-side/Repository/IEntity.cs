namespace Repository
{
    public interface IEntity
    {
        int Id { get; }
        DateTime ModifiedAt { get; }
    }
}
