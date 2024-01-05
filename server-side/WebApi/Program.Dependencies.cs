using Repository.Database;
using Services.AcutalTimetables;
using Services.Asc.Changes;
using Services.Interfaces.Actual;
using Services.Interfaces.Stable;
using Services.StableTimetables;

namespace WebApi
{
    internal static partial class Program
    {
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
    }
}
