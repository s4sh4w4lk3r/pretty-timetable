using HotChocolate.Data.Filters;
using Repository.Entities.Timetable.Cards;

namespace WebApi.GraphQL.FilterTypes
{
    public class ActualCardFilterType : FilterInputType<ActualCard>
    {
        protected override void Configure(IFilterInputTypeDescriptor<ActualCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
