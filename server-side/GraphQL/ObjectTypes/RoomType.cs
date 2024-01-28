using Repository.Entities.Timetable.Cards.Info;

namespace GraphQL.ObjectTypes
{
    public class RoomType : ObjectType<Room>
    {
        protected override void Configure(IObjectTypeDescriptor<Room> descriptor)
        {
            descriptor.BindFieldsImplicitly();

            descriptor.Ignore(e => e.ActualCards);
            descriptor.Ignore(e => e.StableCards);
        }
    }
}
