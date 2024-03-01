using GraphQL;
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

            .AddProjections()
            .AddFiltering()
            .AddSorting()
            .AddAuthorization();
        }
    }
}
