using PrettyTimetable.Abstractions.Stable;
using PrettyTimetable.Abstractions;
using PrettyTimetable.Abstractions.Actual;
using PrettyTimetable.Abstractions.CardParts;
using PrettyTimetable.Services.StableTimetables;
using PrettyTimetable.Services.AcutalTimetables;
using PrettyTimetable.Services.Asc.Changes;
using PrettyTimetable.Repository.Database;
using PrettyTimetable.Services;
using PrettyTimetable.Services.CardParts;

namespace PrettyTimetable.WebApi
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
