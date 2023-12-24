using Services.Asc.Changes;

namespace TestConsoleApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var path = @"C:\Users\sanchous\Desktop\projects\fine\timetable-backend\данные\замены.xml";
            var c = new ChangesConverter(null);
            c.ConvertAndSaveAsync(path).Wait();
        }
    }
}
