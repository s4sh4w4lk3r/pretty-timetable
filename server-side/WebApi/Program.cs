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

            app.MapControllers();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<TimetableContext>();
                var list = db.Teachers.ToList();

            }

            app.Run();
        }
    }
}
