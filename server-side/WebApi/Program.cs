using HotChocolate.AspNetCore;
using Microsoft.EntityFrameworkCore;
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

            builder.ConfigureServices();





            var app = builder.Build();

            app.UseForwardedHeaders();

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseCors(o => o.AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:5173"));


            app.MapGraphQL().WithOptions(new GraphQLServerOptions
            {
                Tool = { Enable = app.Environment.IsDevelopment() }
            }).RequireAuthorization();


            app.MapControllers().RequireAuthorization();


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<TimetableContext>();
                if (db.Database.GetPendingMigrations().Any())
                {
                    db.Database.Migrate();
                }
            }



            app.Run();
        }
    }
}
