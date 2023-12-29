using HotChocolate.Data.Sorting;
using Repository.Entities.Timetable.Cards;

namespace WebApi.GraphQL.SortTypes
{
    public class ActualCardSortType : SortInputType<ActualCard>
    {
        protected override void Configure(ISortInputTypeDescriptor<ActualCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
