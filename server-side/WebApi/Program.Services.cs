using Microsoft.OpenApi.Models;
using System.Reflection;

namespace WebApi
{
    internal static partial class Program
    {
        public static void ConfigureBuilder(this WebApplicationBuilder builder)
        {
            builder.ConfigureAuth();
            builder.ConfigureGraphQL();
            builder.ConfigureDependencies();
            builder.ConfigureIOptions();


            builder.Services.AddControllers();

            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Timetable WebApi",
                    Description = "Timetable WebApi"
                });

                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(System.IO.Path.Combine(AppContext.BaseDirectory, xmlFilename));
            });

        }
    }
}
