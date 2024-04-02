using System.Xml.Serialization;

#pragma warning disable 8618
namespace PrettyTimetable.Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "subject")]
    public class Subject
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "short")]
        public string Short { get; set; }
        [XmlAttribute(AttributeName = "partner_id")]
        public string Partner_id { get; set; }
    }

}