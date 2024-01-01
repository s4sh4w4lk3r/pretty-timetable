using HotChocolate.Data.Filters;
using Repository.Entities.Timetable.Cards;

namespace GraphQL.FilterTypes
{
    public class ActualCardFilterType : FilterInputType<ActualCard>
    {
        protected override void Configure(IFilterInputTypeDescriptor<ActualCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
