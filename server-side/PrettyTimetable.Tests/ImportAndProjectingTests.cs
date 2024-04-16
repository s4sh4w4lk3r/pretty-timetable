using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PrettyTimetable.Abstractions.Actual;
using PrettyTimetable.Abstractions.Stable;
using PrettyTimetable.Repository.Database;
using PrettyTimetable.Services.AcutalTimetables;
using PrettyTimetable.Services.Asc.Changes;
using System.Globalization;

namespace PrettyTimetable.Tests
{
    public class ImportAndProjectingTests
    {
        private readonly ServiceProvider serviceProvider;

        public ImportAndProjectingTests()
        {
            ServiceCollection services = new();
            services.AddDbContext<TimetableContext>(options =>
            options.UseInMemoryDatabase("Test"));
            services.AddScoped<IAscService, AscService>();
            services.AddScoped<IActualTimetableService, ActualTimetableService>();

            serviceProvider = services.BuildServiceProvider();
        }

        private async Task ImportAscDatabase()
        {
            using IServiceScope scope = serviceProvider.CreateScope();
            var ascService = scope.ServiceProvider.GetRequiredService<IAscService>();

            string path = @"C:\Users\sanchous\Desktop\projects\timetable-backend\база.xml";
            await ascService.ImportTimetablesAsync(path: path);
        }

        private async Task ProjectTimetable()
        {
            using IServiceScope scope = serviceProvider.CreateScope();

            var actualTimetableService = scope.ServiceProvider.
            GetRequiredService<IActualTimetableService>();
            string[] dates = ["15.04.2024", "16.04.2024", "17.04.2024", "18.04.2024", "19.04.2024"];
            await actualTimetableService.ProjectStableToActualAsync(dates.Select(DateOnly.Parse));
        }

        [Theory]
        [InlineData("4ИП-2-20", 18)]
        [InlineData("4ИП-1-20", 18)]
        [InlineData("1И-11-23", 21)]
        [InlineData("3И-21", 18)]
        public async Task CountCards(string groupName, int expectedActualCardsCount)
        {
            using IServiceScope scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<TimetableContext>();

            await context.Database.EnsureDeletedAsync();
            await ImportAscDatabase();
            await ProjectTimetable();

            int currentWeekNumber = ISOWeek.GetWeekOfYear(DateTime.Today);
            var cardsCount = await context.ActualCards.Where(ac =>
            ac.RelatedTimetable!.Group!.Name == groupName
            && ac.RelatedTimetable.WeekNumber == currentWeekNumber).ToListAsync();

            Assert.Equal(expectedActualCardsCount, cardsCount.Count);
        }
    }
}
