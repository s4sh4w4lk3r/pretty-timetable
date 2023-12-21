using System.Xml.Serialization;

#pragma warning disable 8618
namespace Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "group")]
    public class Group
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "classid")]
        public string Classid { get; set; }
        [XmlAttribute(AttributeName = "studentids")]
        public string Studentids { get; set; }
        [XmlAttribute(AttributeName = "entireclass")]
        public string Entireclass { get; set; }
        [XmlAttribute(AttributeName = "divisiontag")]
        public string Divisiontag { get; set; }
        [XmlAttribute(AttributeName = "studentcount")]
        public string Studentcount { get; set; }
    }

}