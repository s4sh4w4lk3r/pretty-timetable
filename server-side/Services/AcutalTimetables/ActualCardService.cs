using Repository.Database;
using Repository.Entities.Timetable.Cards;

namespace Services.AcutalTimetables
{
    public class ActualCardService(TimetableContext timetableContext)
    {
        /*public async Task<ServiceResult> UpdateCard(ActualCard actualCard)
        {
            var cardFromRepo = timetableContext.ActualCards.SingleOrDefault(e => e.Id == actualCard.Id);
            if (cardFromRepo is null)
            {
                return ServiceResult.Fail("Такой карточки актуального расписания нет в бд для обновления.");
            }


        }*/
    }
}
