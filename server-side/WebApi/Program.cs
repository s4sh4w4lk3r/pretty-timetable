using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Services.AcutalTimetables;

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

                /*var ats = scope.ServiceProvider.GetRequiredService<ActualTimetableService>();
                ats.Foo([
                    new DateOnly(2023, 12, 25),
                    new DateOnly(2023, 12, 26),
                    new DateOnly(2023, 12, 27),
                    new DateOnly(2023, 12, 28),
                    new DateOnly(2023, 12, 29)]).Wait();*/

                var tt = db.ActualTimetables.Where(e => e.Group.Name == "4�-2-20")
                    .Include(e => e.Group)
                    .Include(e => e.Cards).ThenInclude(e => e.Cabinet)
                    .Include(e => e.Cards).ThenInclude(e => e.Teacher)
                    .Include(e => e.Cards).ThenInclude(e => e.LessonTime)
                    .Include(e => e.Cards).ThenInclude(e => e.Subject).Single();

                var dd = tt.Cards.Where(e => e.Date.DayOfWeek == DayOfWeek.Monday).ToList();
            }

            app.Run();
        }
    }
}
