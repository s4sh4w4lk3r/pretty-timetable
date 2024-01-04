namespace Models.Request.Timetables.Cards
{
    public record class ActualCardUpdateModel(int Id, int TeacherId, int SubjectId, int CabinetId, 
        int LessonTimeId, int SubGroup, bool IsModified, bool IsCanceled, bool IsMoved) {}
}
