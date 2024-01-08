using Auth;
using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;

namespace WebApi
{
    internal static partial class Program
    {
        /// <summary>
        /// Конфигурация аутентификации и авториации.
        /// </summary>
        /// <param name="builder"></param>
        /// <exception cref="ArgumentNullException"></exception>
        private static void ConfigureAuth(this WebApplicationBuilder builder)
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
    }
}
