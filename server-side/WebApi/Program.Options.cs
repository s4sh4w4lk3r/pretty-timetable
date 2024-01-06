using Microsoft.AspNetCore.HttpOverrides;
using Repository.Database;

namespace WebApi
{
    internal static partial class Program
    {
        public static void ConfigureIOptions(this WebApplicationBuilder builder)
        {
            builder.Services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });

            builder.Services.Configure<PostgresConfiguration>(builder.Configuration.GetRequiredSection(nameof(PostgresConfiguration)));
            builder.Services.Configure<CorsConfiguration>(builder.Configuration.GetRequiredSection(nameof(CorsConfiguration)));
        }
    }

    internal class CorsConfiguration
    {
        public string[] Origins { get; init; } = [];
    }
}
