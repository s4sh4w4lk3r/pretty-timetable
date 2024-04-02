using System.Xml.Serialization;

#pragma warning disable 8618
namespace PrettyTimetable.Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "period")]
    public class Period
    {
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "short")]
        public string Short { get; set; }
        [XmlAttribute(AttributeName = "period")]
        public string _period { get; set; }
        [XmlAttribute(AttributeName = "starttime")]
        public string Starttime { get; set; }
        [XmlAttribute(AttributeName = "endtime")]
        public string Endtime { get; set; }
    }

}