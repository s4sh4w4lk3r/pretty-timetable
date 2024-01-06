using Microsoft.EntityFrameworkCore;
using Repository.Database;
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
        /// Проверяет, есть ли в бд внешние ключи, относящиеся к карточке, полученной в параметрах этого метода.
        /// </summary>
        /// <param name="card"></param>
        /// <param name="cancellationToken"></param>
        /// <returns>Возвращает True, если все внешние ключи присутсвуют, если хоть один внешний ключ отсутсвует - False.</returns>
        public static async Task<bool> IsForeignKeysExistsAsync(TimetableContext timetableContext, ICard card, CancellationToken cancellationToken = default)
        {
            return await timetableContext.Subjects.AnyAsync(e => e.Id == card.SubjectId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == card.TeacherId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == card.LessonTimeId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == card.CabinetId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == card.SubjectId, cancellationToken) &&
            await timetableContext.Subjects.AnyAsync(e => e.Id == card.RelatedTimetableId, cancellationToken);
        }
    }
}
