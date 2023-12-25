using System.Xml.Serialization;

#pragma warning disable 8618
namespace Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "cards")]
    public class Cards
    {
        [XmlElement(ElementName = "card")]
        public List<Card> Card { get; set; }
        [XmlAttribute(AttributeName = "options")]
        public string Options { get; set; }
        [XmlAttribute(AttributeName = "columns")]
        public string Columns { get; set; }
    }

}