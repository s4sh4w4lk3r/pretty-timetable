using Microsoft.EntityFrameworkCore;
using Repository.Database;
using Repository.Entities.Timetable;
using Repository.Entities.Timetable.Cards;

namespace Services.Other
{
    internal static class CardServiceHelper
    {
        public const string ID_MUST_BE_ZERO_MSG = "При добавлении карточки Id должен быть равен нулю.";
        public const string CARD_NOT_FOUND_MSG = "Карточка с таким Id не найдена в бд.";
        public const string FOREIGN_KEYS_NOT_FOUND_MSG = "Некоторые внешние ключи указывают на несуществующие значения в бд.";
        public const string CARD_OVERLAID_MSG = "Похожая карточка уже есть в бд.";

        /// <summary>
        /// Проверяет, есть ли в бд внешние ключи, относящиеся к карточке, полученной в параметрах этого метода. В качестве дженерика принимает класс расписания, реализующий ITimetable.
        /// </summary>
        /// <param name="card"></param>
        /// <param name="cancellationToken"></param>
        /// <param name="timetableContext"></param>
        /// <returns>Возвращает True, если все внешние ключи присутсвуют, если хоть один внешний ключ отсутсвует - False.</returns>
        public static async Task<bool> IsForeignKeysExistsAsync<T>(TimetableContext timetableContext, ICard card, CancellationToken cancellationToken = default) where T : class, ITimetable
        {
            bool b = await timetableContext.Subjects.AnyAsync(e => e.Id == card.SubjectId, cancellationToken);
            bool b1 = await timetableContext.Teachers.AnyAsync(e => e.Id == card.TeacherId, cancellationToken);
            bool b2 = await timetableContext.LessonTimes.AnyAsync(e => e.Id == card.LessonTimeId, cancellationToken);
            bool b3 = await timetableContext.Cabinets.AnyAsync(e => e.Id == card.CabinetId, cancellationToken);
            bool b4 = await timetableContext.Subjects.AnyAsync(e => e.Id == card.SubjectId, cancellationToken);
            bool b5 = await timetableContext.Set<T>().AnyAsync(e => e.Id == card.RelatedTimetableId, cancellationToken);

            return (b && b1 && b2 && b3 && b4 && b5);
        }
    }
}
