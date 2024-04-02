using System.Xml.Serialization;

#pragma warning disable 8618
namespace PrettyTimetable.Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "card")]
    public class Card
    {
        [XmlAttribute(AttributeName = "lessonid")]
        public string Lessonid { get; set; }
        [XmlAttribute(AttributeName = "classroomids")]
        public string Classroomids { get; set; }
        [XmlAttribute(AttributeName = "period")]
        public string Period { get; set; }
        [XmlAttribute(AttributeName = "weeks")]
        public string Weeks { get; set; }
        [XmlAttribute(AttributeName = "terms")]
        public string Terms { get; set; }
        [XmlAttribute(AttributeName = "days")]
        public string Days { get; set; }
    }

}