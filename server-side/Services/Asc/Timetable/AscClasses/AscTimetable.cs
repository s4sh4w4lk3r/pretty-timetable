using System.Xml.Serialization;


#pragma warning disable 8618
namespace Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "timetable")]
    public class AscTimetable
    {
        [XmlElement(ElementName = "periods")]
        public Periods Periods { get; set; }
        [XmlElement(ElementName = "daysdefs")]
        public Daysdefs Daysdefs { get; set; }
        [XmlElement(ElementName = "weeksdefs")]
        public Weeksdefs Weeksdefs { get; set; }
        [XmlElement(ElementName = "termsdefs")]
        public Termsdefs Termsdefs { get; set; }
        [XmlElement(ElementName = "subjects")]
        public Subjects Subjects { get; set; }
        [XmlElement(ElementName = "teachers")]
        public Teachers Teachers { get; set; }
        [XmlElement(ElementName = "buildings")]
        public Buildings Buildings { get; set; }
        [XmlElement(ElementName = "classrooms")]
        public Classrooms Classrooms { get; set; }
        [XmlElement(ElementName = "grades")]
        public Grades Grades { get; set; }
        [XmlElement(ElementName = "classes")]
        public Classes Classes { get; set; }
        [XmlElement(ElementName = "groups")]
        public Groups Groups { get; set; }
        [XmlElement(ElementName = "students")]
        public Students Students { get; set; }
        [XmlElement(ElementName = "studentsubjects")]
        public Studentsubjects Studentsubjects { get; set; }
        [XmlElement(ElementName = "lessons")]
        public Lessons Lessons { get; set; }
        [XmlElement(ElementName = "cards")]
        public Cards Cards { get; set; }
        [XmlAttribute(AttributeName = "ascttversion")]
        public string Ascttversion { get; set; }
        [XmlAttribute(AttributeName = "importtype")]
        public string Importtype { get; set; }
        [XmlAttribute(AttributeName = "options")]
        public string Options { get; set; }
        [XmlAttribute(AttributeName = "defaultexport")]
        public string Defaultexport { get; set; }
        [XmlAttribute(AttributeName = "displayname")]
        public string Displayname { get; set; }
        [XmlAttribute(AttributeName = "displaycountries")]
        public string Displaycountries { get; set; }
    }

}