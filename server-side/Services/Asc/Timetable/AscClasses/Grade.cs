using System.Xml.Serialization;

#pragma warning disable 8618
namespace Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "grade")]
    public class Grade
    {
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "short")]
        public string Short { get; set; }
        [XmlAttribute(AttributeName = "grade")]
        public string _grade { get; set; }
    }

}