using System.Xml.Serialization;

#pragma warning disable 8618
namespace PrettyTimetable.Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "lesson")]
    public class Lesson
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlAttribute(AttributeName = "classids")]
        public string Classids { get; set; }
        [XmlAttribute(AttributeName = "subjectid")]
        public string Subjectid { get; set; }
        [XmlAttribute(AttributeName = "periodspercard")]
        public string Periodspercard { get; set; }
        [XmlAttribute(AttributeName = "periodsperweek")]
        public string Periodsperweek { get; set; }
        [XmlAttribute(AttributeName = "teacherids")]
        public string Teacherids { get; set; }
        [XmlAttribute(AttributeName = "classroomids")]
        public string Classroomids { get; set; }
        [XmlAttribute(AttributeName = "groupids")]
        public string Groupids { get; set; }
        [XmlAttribute(AttributeName = "capacity")]
        public string Capacity { get; set; }
        [XmlAttribute(AttributeName = "seminargroup")]
        public string Seminargroup { get; set; }
        [XmlAttribute(AttributeName = "termsdefid")]
        public string Termsdefid { get; set; }
        [XmlAttribute(AttributeName = "weeksdefid")]
        public string Weeksdefid { get; set; }
        [XmlAttribute(AttributeName = "daysdefid")]
        public string Daysdefid { get; set; }
        [XmlAttribute(AttributeName = "partner_id")]
        public string Partner_id { get; set; }
    }

}