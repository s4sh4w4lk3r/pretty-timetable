﻿using System.Xml.Serialization;

#pragma warning disable 8618
namespace Services.Asc.Timetable.AscClasses
{
    [XmlRoot(ElementName = "daysdefs")]
    public class Daysdefs
    {
        [XmlElement(ElementName = "daysdef")]
        public List<Daysdef> Daysdef { get; set; }
        [XmlAttribute(AttributeName = "options")]
        public string Options { get; set; }
        [XmlAttribute(AttributeName = "columns")]
        public string Columns { get; set; }
    }

}