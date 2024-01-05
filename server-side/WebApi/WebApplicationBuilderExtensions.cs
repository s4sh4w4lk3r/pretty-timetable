using Auth;
using GraphQL.EnumTypes;
using GraphQL.ObjectTypes;
using GraphQL.OperationTypes;
using HotChocolate.Types;
using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;
using Repository.Database;
using Services.AcutalTimetables;
using Services.Asc.Changes;
using Services.Interfaces.Actual;
using Services.Interfaces.Stable;
using Services.StableTimetables;
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
            builder.Services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });

            builder.Services.AddControllers();

            builder.ConfigureIAA();
            builder.ConfigureGraphQL();

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

            builder.ConfigureDependencies();
        }

        private static void ConfigureDependencies(this WebApplicationBuilder builder)
        {
            builder.Services.AddDbContext<TimetableContext>(contextLifetime: ServiceLifetime.Scoped, optionsLifetime: ServiceLifetime.Scoped);
            builder.Services.AddScoped<IAscService, AscService>();
            builder.Services.AddScoped<IActualTimetableService, ActualTimetableService>();
            builder.Services.AddScoped<IActualCardService, ActualCardService>();
            builder.Services.AddScoped<IStableCardService, StableCardService>();
            builder.Services.AddScoped<IStableTimetableService, StableTimetableService>();
            builder.Services.AddScoped<ActualTimetableService, ActualTimetableService>();
        }

        /// <summary>
        /// Конфигурация аутентификации и авториации.
        /// </summary>
        /// <param name="builder"></param>
        /// <exception cref="ArgumentNullException"></exception>
        private static void ConfigureIAA(this WebApplicationBuilder builder)
        {
            const string OPTIONS_ERROR_MSG = "Настройки Keycloak не получены.";

            var authenticationOptions = builder.Configuration.GetSection(KeycloakAuthenticationOptions.Section)
                .Get<KeycloakAuthenticationOptions>() ?? throw new ArgumentNullException(OPTIONS_ERROR_MSG);

            var authorizationIOptions = builder.Configuration.GetSection(KeycloakAuthenticationOptions.Section)
                .Get<KeycloakProtectionClientOptions>() ?? throw new ArgumentNullException(OPTIONS_ERROR_MSG);

            builder.Services.AddKeycloakAuthentication(authenticationOptions);

            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy(KeycloakPolicies.TimetableR, builder =>
                {
                    builder.RequireProtectedResource(resource: "timetable", "read");
                });

                options.AddPolicy(KeycloakPolicies.TimetableCRUD, builder =>
                {
                    builder.RequireProtectedResource(resource: "timetable", "read");
                    builder.RequireProtectedResource(resource: "timetable", "create");
                    builder.RequireProtectedResource(resource: "timetable", "update");
                    builder.RequireProtectedResource(resource: "timetable", "delete");
                });

                options.DefaultPolicy = options.GetPolicy(KeycloakPolicies.TimetableR) ?? throw new ArgumentNullException(KeycloakPolicies.TimetableR, "Политика авторизации по умолчанию не зарегистрирована.");
            })
            .AddKeycloakAuthorization(authorizationIOptions);
        }

        private static void ConfigureGraphQL(this WebApplicationBuilder builder)
        {
            builder.Services
            .AddGraphQLServer()
            .ModifyOptions(options => { options.DefaultBindingBehavior = BindingBehavior.Explicit; })

            .AddQueryType<QueryType>()

            .AddType<ActualTimetableType>()
            .AddType<ActualCardType>()
            .AddType<StableTimetableType>()
            .AddType<StableCardType>()
            .AddType<GroupType>()
            .AddType<TeacherType>()
            .AddType<SubjectType>()
            .AddType<CabinetType>()
            .AddType<LessonTimeType>()

            .AddType<SubGroupType>()
            .AddType<DayOfWeekType>()

            .AddProjections()
            .AddFiltering()
            .AddSorting()
            .AddAuthorization();
        }
    }
}
