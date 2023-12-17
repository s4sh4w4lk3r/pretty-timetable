namespace Repository.Entities.Timetable
{
    public interface ITimetable : IEntity
    {
        public Group? Group { get; }
        public int GroupId { get; }

        /// <summary>
        /// Должен проверять наличие ячеек-дубликатов, которые ссылаются на одно и то же время занятий.
        /// </summary>
        /// <returns>True - если нет дубликатов, в противном случае False.</returns>
        public bool CheckNoDuplicates();
    }
}
