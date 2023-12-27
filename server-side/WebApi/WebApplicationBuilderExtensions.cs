using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repository.Database;
using Services.AcutalTimetables;
using System.Reflection;

namespace WebApi
{
    internal static class WebApplicationBuilderExtensions
    {
        public static void ConfigureIOptions(this WebApplicationBuilder builder)
        {
            builder.Services.Configure<PostgresConfiguration>(builder.Configuration.GetRequiredSection(nameof(PostgresConfiguration)));
        }

        public static void ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.MetadataAddress = builder.Configuration.GetRequiredSection("IdentityConfiguration").GetRequiredSection("MetadataAddress").Value!;
                options.Authority = builder.Configuration.GetRequiredSection("IdentityConfiguration").GetRequiredSection("Authority").Value!;
                options.Audience = builder.Configuration.GetRequiredSection("IdentityConfiguration").GetRequiredSection("Audience").Value!;
                options.RequireHttpsMetadata = false;
            });
            builder.Services.AddAuthorization();

            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Timetable WebApi",
                    Description = "Timetable WebApi"
                });

                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
            });

            builder.ConfigureDependencies();
        }

        private static void ConfigureDependencies(this WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<TimetableContext>(contextLifetime: ServiceLifetime.Scoped, optionsLifetime: ServiceLifetime.Scoped);
            builder.Services.AddScoped<Services.Asc.AscService>();
            builder.Services.AddScoped<ActualTimetableService>();
        }
    }
}
