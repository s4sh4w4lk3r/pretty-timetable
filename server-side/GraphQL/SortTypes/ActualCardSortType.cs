using HotChocolate.Data.Sorting;
using Repository.Entities.Timetable.Cards;

namespace GraphQL.SortTypes
{
    internal class ActualCardSortType : SortInputType<ActualCard>
    {
        protected override void Configure(ISortInputTypeDescriptor<ActualCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
