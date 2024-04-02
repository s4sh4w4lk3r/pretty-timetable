using System.Xml.Serialization;

#pragma warning disable 8618
namespace PrettyTimetable.Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "teacher")]
    public class Teacher
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlAttribute(AttributeName = "firstname")]
        public string Firstname { get; set; }
        [XmlAttribute(AttributeName = "lastname")]
        public string Lastname { get; set; }
        [XmlAttribute(AttributeName = "name")]
        public string Name { get; set; }
        [XmlAttribute(AttributeName = "short")]
        public string Short { get; set; }
        [XmlAttribute(AttributeName = "gender")]
        public string Gender { get; set; }
        [XmlAttribute(AttributeName = "color")]
        public string Color { get; set; }
        [XmlAttribute(AttributeName = "email")]
        public string Email { get; set; }
        [XmlAttribute(AttributeName = "mobile")]
        public string Mobile { get; set; }
        [XmlAttribute(AttributeName = "partner_id")]
        public string Partner_id { get; set; }
    }

}