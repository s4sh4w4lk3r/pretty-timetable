using HotChocolate.Data.Filters;
using Repository.Entities.Timetable.Cards;

namespace GraphQL.FilterTypes
{
    internal class ActualCardFilterType : FilterInputType<ActualCard>
    {
        protected override void Configure(IFilterInputTypeDescriptor<ActualCard> descriptor)
        {
            descriptor.BindFieldsImplicitly();
        }
    }
}
