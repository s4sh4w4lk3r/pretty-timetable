using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Repository.Entities.Timetable.Cards;
using Repository.Entities.Timetable;
using WebApi.GraphQL.FilterTypes;
using WebApi.GraphQL.SortTypes;

namespace WebApi.GraphQL.OperationTypes
{
    public class Query
    {
        public IQueryable<Subject> GetSubjects([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Subjects;
        public IQueryable<Teacher> GetTeachers([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Teachers;
        public IQueryable<Group> GetGroups([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Groups;
        public IQueryable<Cabinet> GetCabinets([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Cabinets;
        public IQueryable<LessonTime> GetLessonTimes([Service(ServiceKind.Synchronized)] TimetableContext context) => context.LessonTimes;
        public IQueryable<ActualCard> GetActualCards([Service(ServiceKind.Synchronized)] TimetableContext context) => context.ActualCards;
        public IQueryable<ActualTimetable> GetActualTimetables([Service(ServiceKind.Synchronized)] TimetableContext context) => context.ActualTimetables;
        public IQueryable<StableCard> GetStableCards([Service(ServiceKind.Synchronized)] TimetableContext context) => context.StableCards;
        public IQueryable<StableTimetable> GetStableTimetables([Service(ServiceKind.Synchronized)] TimetableContext context) => context.StableTimetables;
    }

    public class QueryType : ObjectType<Query>
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


            descriptor.Field(e => e.GetCabinets(default!))
                .UseFiltering<Cabinet>(x =>
                {
                    x.BindFieldsImplicitly(); x.Ignore(e => e.StableCards); x.Ignore(e => e.ActualCards);
                })
                .UseSorting<Cabinet>(x =>
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
    }
}
