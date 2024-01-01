using HotChocolate.Data.Sorting;
using Repository.Entities.Timetable.Cards;

namespace GraphQL.SortTypes
{
    public class StableCardSortType : SortInputType<StableCard>
    {
        protected override void Configure(ISortInputTypeDescriptor<StableCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
