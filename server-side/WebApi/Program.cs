using Repository.Database;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.ConfigureIOptions();
            builder.ConfigureServices();

            var app = builder.Build();

            using var scope = app.Services.CreateScope();
            scope.ServiceProvider.GetRequiredService<TimetableContext>().Database.EnsureCreated();

            app.MapControllers();
            app.Run();
        } 
    }
}
