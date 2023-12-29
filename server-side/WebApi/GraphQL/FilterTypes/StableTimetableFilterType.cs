using HotChocolate.Data.Filters;
using Repository.Entities.Timetable;

namespace WebApi.GraphQL.FilterTypes
{
    public class StableTimetableFilterType : FilterInputType<StableTimetable>
    {
        protected override void Configure(IFilterInputTypeDescriptor<StableTimetable> descriptor)
        {
            descriptor.BindFieldsImplicitly();
            descriptor.Field(e => e.Cards).Type<StableCardFilterType>();
        }
    }
}
