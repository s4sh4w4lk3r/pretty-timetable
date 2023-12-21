using System.Xml;
using System.Xml.Serialization;

namespace Services.Asc.Timetable
{
    public class Converter
    {
        public static void Foo(string path)
        {
            var serializer = new XmlSerializer(typeof(Substitutions));
            var xr = XmlReader.Create(path);
            var da = serializer.Deserialize(xr) as Substitutions;
        }
    }
}
