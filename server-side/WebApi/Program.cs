using Microsoft.EntityFrameworkCore;
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
                db.Database.EnsureDeleted();
                db.Database.EnsureCreated();
                var con = scope.ServiceProvider.GetRequiredService<Services.Asc.Timetable.Converter>();
                con.ConvertAndSaveAsync(@"C:\\Users\\sanchous\\Desktop\\projects\\fine\\timetable-backend\\данные\\база.xml").Wait();

                var tt = db.StableTimetables.Where(e => e.Group.Name == "2ИП-1-22")
                    .Include(e => e.Cards).ThenInclude(e => e.Teacher)
                    .Include(e => e.Cards).ThenInclude(e => e.Subject)
                    .Include(e => e.Cards).ThenInclude(e => e.LessonTime)
                    .Include(e => e.Cards).ThenInclude(e => e.Cabinet).Single();

                var c = tt.Cards.Where(e => e.IsWeekEven == true && e.DayOfWeek == DayOfWeek.Friday).ToList();
            }

            //app.Run();
        } 
    }
}
