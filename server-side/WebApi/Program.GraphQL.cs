using GraphQL.EnumTypes;
using GraphQL.ObjectTypes;
using GraphQL.OperationTypes;
using HotChocolate.Types;

namespace WebApi
{
    internal static partial class Program
    {
        private static void ConfigureGraphQL(this WebApplicationBuilder builder)
        {
            builder.Services
            .AddGraphQLServer()
            .ModifyOptions(options => { options.DefaultBindingBehavior = BindingBehavior.Implicit; })

            .AllowIntrospection(builder.Environment.IsDevelopment())
            .ModifyRequestOptions(o => o.OnlyAllowPersistedQueries = !builder.Environment.IsDevelopment())

            .UsePersistedQueryPipeline()
            .AddReadOnlyFileSystemQueryStorage("./../GraphQL/PersistedQueries")

            .AddQueryType<Query>()

/*            .AddType<ActualTimetableType>()
            .AddType<ActualCardType>()
            .AddType<StableTimetableType>()
            .AddType<StableCardType>()
            .AddType<GroupType>()
            .AddType<TeacherType>()
            .AddType<SubjectType>()
            .AddType<RoomType>()
            .AddType<LessonTimeType>()

            .AddType<SubGroupType>()
            .AddType<DayOfWeekType>()*/

            .AddProjections()
            .AddFiltering()
            .AddSorting()
            .AddAuthorization();
        }
    }
}
