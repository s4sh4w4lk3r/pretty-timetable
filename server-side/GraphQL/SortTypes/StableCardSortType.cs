using HotChocolate.Data.Sorting;
using Repository.Entities.Timetable.Cards;

namespace GraphQL.SortTypes
{
    internal class StableCardSortType : SortInputType<StableCard>
    {
        protected override void Configure(ISortInputTypeDescriptor<StableCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
