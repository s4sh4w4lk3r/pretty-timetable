using PrettyTimetable.GraphQL;
using HotChocolate.Types;

namespace PrettyTimetable.WebApi
{
    internal static partial class Program
    {
        private static void ConfigureGraphQL(this WebApplicationBuilder builder)
        {
            builder.Services
            .AddGraphQLServer()
            .ModifyOptions(options => { options.DefaultBindingBehavior = BindingBehavior.Implicit; })

            .AllowIntrospection(true)
            .ModifyRequestOptions(o => o.OnlyAllowPersistedQueries = false)

            .AddQueryType<Query>()

            .AddProjections()
            .AddFiltering()
            .AddSorting();
        }
    }
}
