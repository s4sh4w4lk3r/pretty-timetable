using Repository.Database;
using Repository.Entities.Timetable;
using Repository.Entities.Timetable.Cards;
using Repository.Entities.Timetable.Cards.Info;

namespace GraphQL.OperationTypes
{
    public class Query
    {
        [UseProjection][UseFiltering][UseSorting] public IQueryable<Subject> GetSubjects([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Subjects;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<Teacher> GetTeachers([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Teachers;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<Group> GetGroups([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Groups;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<Room> GetRooms([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Cabinets;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<LessonTime> GetLessonTimes([Service(ServiceKind.Synchronized)] TimetableContext context) => context.LessonTimes;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<ActualCard> GetActualCards([Service(ServiceKind.Synchronized)] TimetableContext context) => context.ActualCards;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<ActualTimetable> GetActualTimetables([Service(ServiceKind.Synchronized)] TimetableContext context) => context.ActualTimetables;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<StableCard> GetStableCards([Service(ServiceKind.Synchronized)] TimetableContext context) => context.StableCards;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<StableTimetable> GetStableTimetables([Service(ServiceKind.Synchronized)] TimetableContext context) => context.StableTimetables;
    }

    /*public class QueryType : ObjectType<Query>
    {
        protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
        {
            descriptor.Field(e => e.GetTeachers(default!))
                .UseFiltering<Teacher>(x =>
                {
                    x.BindFieldsImplicitly(); x.Ignore(e => e.StableCards); x.Ignore(e => e.ActualCards);
                })
                .UseSorting<Teacher>(x =>
                {
                    x.BindFieldsImplicitly(); x.Ignore(e => e.StableCards); x.Ignore(e => e.ActualCards);
                });


            descriptor.Field(e => e.GetRooms(default!))
                .UseFiltering<Room>(x =>
                {
                    x.BindFieldsImplicitly(); x.Ignore(e => e.StableCards); x.Ignore(e => e.ActualCards);
                })
                .UseSorting<Room>(x =>
                {
                    x.BindFieldsImplicitly(); x.Ignore(e => e.StableCards); x.Ignore(e => e.ActualCards);
                });


            descriptor.Field(e => e.GetLessonTimes(default!))
                .UseFiltering<LessonTime>(x =>
                {
                    x.BindFieldsImplicitly(); x.Ignore(e => e.StableCards); x.Ignore(e => e.ActualCards);
                    x.Field(e => e.EndsAt).Type<NonNullType<StringType>>(); x.Field(e => e.StartsAt).Type<NonNullType<StringType>>();
                })
                .UseSorting<LessonTime>(x =>
                {
                    x.BindFieldsImplicitly(); x.Ignore(e => e.StableCards); x.Ignore(e => e.ActualCards);
                    x.Field(e => e.EndsAt).Type<NonNullType<StringType>>(); x.Field(e => e.StartsAt).Type<NonNullType<StringType>>();
                });


            descriptor.Field(e => e.GetSubjects(default!))
                .UseFiltering<Subject>(x =>
                {
                    x.BindFieldsImplicitly(); x.Ignore(e => e.StableCards); x.Ignore(e => e.ActualCards);
                })
                .UseSorting<Subject>(x =>
                {
                    x.BindFieldsImplicitly(); x.Ignore(e => e.StableCards); x.Ignore(e => e.ActualCards);
                });


            descriptor.Field(e => e.GetGroups(default!))
                .UseFiltering<Group>(x =>
                {
                    x.BindFieldsImplicitly();
                })
                .UseSorting<Group>(x =>
                {
                    x.BindFieldsImplicitly();
                });

            descriptor.Field(e => e.GetActualCards(default!)).UseProjection().UseFiltering<ActualCardFilterType>().UseSorting<ActualCardSortType>();
            descriptor.Field(e => e.GetActualTimetables(default!)).UseProjection().UseFiltering<ActualTimetableFilterType>().UseSorting<ActualTimetableSortType>();

            descriptor.Field(e => e.GetStableCards(default!)).UseProjection().UseFiltering<StableCardFilterType>().UseSorting<StableCardSortType>();
            descriptor.Field(e => e.GetStableTimetables(default!)).UseProjection().UseFiltering<StableTimetableFilterType>().UseSorting<StableTimetableSortType>();
        }
    }*/
}
