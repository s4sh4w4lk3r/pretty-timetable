using Microsoft.OpenApi.Models;
using Repository.Database;
using System.Reflection;

namespace WebApi.Extensions
{
    public static class WebApplicationBuilderExtensions
    {
        public static void ConfigureIOptions(this WebApplicationBuilder builder)
        {
            builder.Services.Configure<PostgresConfiguration>(builder.Configuration.GetRequiredSection(nameof(PostgresConfiguration)));
        }

        public static void ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();

            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Timetable WebApi",
                    Description = "Timetable WebApi"
#warning сделать сваггер дев онли
                });

                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
            });

            builder.ConfigureDependencies();
        }

        private static void ConfigureDependencies(this WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<TimetableContext>(contextLifetime: ServiceLifetime.Scoped, optionsLifetime: ServiceLifetime.Scoped);
        }
    }
}
