using System.Xml.Serialization;

#pragma warning disable 8618
namespace PrettyTimetable.Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "periods")]
    public class Periods
    {
        [XmlElement(ElementName = "period")]
        public List<Period> Period { get; set; }
        [XmlAttribute(AttributeName = "options")]
        public string Options { get; set; }
        [XmlAttribute(AttributeName = "columns")]
        public string Columns { get; set; }
    }

}