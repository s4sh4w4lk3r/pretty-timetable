using System.Xml.Serialization;

#pragma warning disable 8618
namespace Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "building")]
    public class Building
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "partner_id")]
        public string Partner_id { get; set; }
    }

}