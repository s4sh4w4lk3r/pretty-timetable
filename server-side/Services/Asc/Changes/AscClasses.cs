// using System.Xml.Serialization;
// XmlSerializer serializer = new XmlSerializer(typeof(Substitutions));
// using (StringReader reader = new StringReader(xml))
// {
//    var test = (Substitutions)serializer.Deserialize(reader);
// }

using System.Xml.Serialization;

[XmlRoot(ElementName = "subst")]
public class Subst
{

    [XmlAttribute(AttributeName = "absent")]
    public string Absent { get; set; }

    [XmlAttribute(AttributeName = "lesson")]
    public int Lesson { get; set; }

    [XmlAttribute(AttributeName = "subject")]
    public string Subject { get; set; }

    [XmlAttribute(AttributeName = "forms")]
    public string Forms { get; set; }

    [XmlAttribute(AttributeName = "groups")]
    public string Groups { get; set; }

    [XmlAttribute(AttributeName = "substituting")]
    public string Substituting { get; set; }

    [XmlAttribute(AttributeName = "subst_type")]
    public string SubstType { get; set; }


    [XmlAttribute(AttributeName = "room")]
    public string Room { get; set; }
}

[XmlRoot(ElementName = "date")]
public class Date
{

    [XmlElement(ElementName = "subst")]
    public List<Subst> Subst { get; set; }

    [XmlAttribute(AttributeName = "day")]
    public int Day { get; set; }

    [XmlAttribute(AttributeName = "month")]
    public int Month { get; set; }

    [XmlAttribute(AttributeName = "year")]
    public int Year { get; set; }
}

[XmlRoot(ElementName = "substitutions")]
public class Substitutions
{

    [XmlElement(ElementName = "date")]
    public Date Date { get; set; }
}

