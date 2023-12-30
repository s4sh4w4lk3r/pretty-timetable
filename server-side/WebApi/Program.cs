using HotChocolate.AspNetCore;
using Serilog;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Host.UseSerilog((ctx, lc) => lc.WriteTo.Console()
            .WriteTo.File($"./logs/log.log", rollingInterval: RollingInterval.Day)
            .ReadFrom.Configuration(ctx.Configuration));

            builder.ConfigureIOptions();
            builder.ConfigureServices();


            var app = builder.Build();


            app.UseAuthentication();
            app.UseAuthorization();


            app.UseCors(o => o.AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:5173"));


            app.MapGraphQL().WithOptions(new GraphQLServerOptions
            {
                Tool = { Enable = app.Environment.IsDevelopment() }
            });


            app.MapControllers();


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            /*            using (var scope = app.Services.CreateScope())
                        {
                            var db = scope.ServiceProvider.GetRequiredService<TimetableContext>();
                        }*/

            app.Run();
        }
    }
}
