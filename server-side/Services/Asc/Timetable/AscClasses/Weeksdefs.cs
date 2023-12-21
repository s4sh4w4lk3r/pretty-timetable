using System.Xml.Serialization;

#pragma warning disable 8618
namespace Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "weeksdefs")]
    public class Weeksdefs
    {
        [XmlElement(ElementName = "weeksdef")]
        public List<Weeksdef> Weeksdef { get; set; }
        [XmlAttribute(AttributeName = "options")]
        public string Options { get; set; }
        [XmlAttribute(AttributeName = "columns")]
        public string Columns { get; set; }
    }

}