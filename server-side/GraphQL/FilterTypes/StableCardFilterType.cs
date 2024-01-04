using HotChocolate.Data.Filters;
using Repository.Entities.Timetable.Cards;

namespace GraphQL.FilterTypes
{
    internal class StableCardFilterType : FilterInputType<StableCard>
    {
        protected override void Configure(IFilterInputTypeDescriptor<StableCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
