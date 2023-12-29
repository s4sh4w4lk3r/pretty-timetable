﻿using HotChocolate.Data.Sorting;
using Repository.Entities.Timetable;

namespace WebApi.GraphQL.SortTypes
{
    public class ActualTimetableSortType : SortInputType<ActualTimetable>
    {
        protected override void Configure(ISortInputTypeDescriptor<ActualTimetable> descriptor)
        {
            descriptor.BindFieldsImplicitly();
            //descriptor.Field(e => e.ActualTimetableCells).Type<ActualTimetableCellSortType>();
        }
    }
}
