using HotChocolate.AspNetCore;
using Microsoft.Extensions.Options;
using Repository.Database;
using Serilog;

namespace WebApi
{
    internal partial class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Host.UseSerilog((ctx, lc) => lc.WriteTo.Console()
            .WriteTo.File($"./logs/log.log", rollingInterval: RollingInterval.Day)
            .ReadFrom.Configuration(ctx.Configuration));

            builder.ConfigureBuilder();


            /*--------------------------------------------------------------------------------------------------------------------*/


            var app = builder.Build();

            app.UseForwardedHeaders();

            app.UseAuthentication();
            app.UseAuthorization();


            var origins = app.Services.GetRequiredService<IOptions<CorsConfiguration>>().Value.Origins;
            app.UseCors(o => o.AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins(origins));


            app.MapGraphQL().RequireAuthorization();

            app.MapControllers().RequireAuthorization();


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.MapBananaCakePop().AllowAnonymous();
            }

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<TimetableContext>();
                /*if (db.Database.GetPendingMigrations().Any())
                {
                    db.Database.Migrate();
                }*/
            }


            /*--------------------------------------------------------------------------------------------------------------------*/


            app.Run();
        }
    }
}
