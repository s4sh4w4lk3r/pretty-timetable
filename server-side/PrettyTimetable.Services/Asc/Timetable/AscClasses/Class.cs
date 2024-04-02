using System.Xml.Serialization;

#pragma warning disable 8618
namespace PrettyTimetable.Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "class")]
    public class Class
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "short")]
        public string Short { get; set; }
        [XmlAttribute(AttributeName = "teacherid")]
        public string Teacherid { get; set; }
        [XmlAttribute(AttributeName = "classroomids")]
        public string Classroomids { get; set; }
        [XmlAttribute(AttributeName = "grade")]
        public string Grade { get; set; }
        [XmlAttribute(AttributeName = "partner_id")]
        public string Partner_id { get; set; }
    }

}