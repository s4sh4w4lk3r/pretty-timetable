using HotChocolate.Data.Sorting;
using Repository.Entities.Timetable;

namespace WebApi.GraphQL.SortTypes
{
    public class StableTimetableSortType : SortInputType<StableTimetable>
    {
        protected override void Configure(ISortInputTypeDescriptor<StableTimetable> descriptor)
        {
            descriptor.BindFieldsImplicitly();
            //descriptor.Field(e => e.StableTimetableCells);
        }
    }
}
