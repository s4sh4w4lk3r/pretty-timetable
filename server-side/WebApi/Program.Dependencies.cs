using PrettyTimetable.Abstractions.Stable;
using Repository.Database;
using Services;
using Services.AcutalTimetables;
using Services.Asc.Changes;
using Services.CardParts;
using PrettyTimetable.Abstractions;
using PrettyTimetable.Abstractions.Actual;
using PrettyTimetable.Abstractions.CardParts;
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

            builder.Services.AddScoped<ITeacherService, TeacherService>();
            builder.Services.AddScoped<IRoomService, RoomService>();
            builder.Services.AddScoped<ISubjectService, SubjectService>();
            builder.Services.AddScoped<ILessonTimeService, LessonTimeService>();
            builder.Services.AddScoped<IGroupService, GroupService>();

        }
    }
}
