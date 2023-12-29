using HotChocolate.Data.Filters;
using Repository.Entities.Timetable.Cards;

namespace WebApi.GraphQL.FilterTypes
{
    public class StableCardFilterType : FilterInputType<StableCard>
    {
        protected override void Configure(IFilterInputTypeDescriptor<StableCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
