using System.Xml.Serialization;

#pragma warning disable 8618
namespace PrettyTimetable.Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "groups")]
    public class Groups
    {
        [XmlElement(ElementName = "group")]
        public List<Group> Group { get; set; }
        [XmlAttribute(AttributeName = "options")]
        public string Options { get; set; }
        [XmlAttribute(AttributeName = "columns")]
        public string Columns { get; set; }
    }

}