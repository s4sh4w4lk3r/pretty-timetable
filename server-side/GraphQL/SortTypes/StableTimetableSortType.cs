using HotChocolate.Data.Sorting;
using Repository.Entities.Timetable;

namespace GraphQL.SortTypes
{
    internal class StableTimetableSortType : SortInputType<StableTimetable>
    {
        protected override void Configure(ISortInputTypeDescriptor<StableTimetable> descriptor)
        {
            descriptor.BindFieldsImplicitly();
            //descriptor.Field(e => e.StableTimetableCells);
        }
    }
}
