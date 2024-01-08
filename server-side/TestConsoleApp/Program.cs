using System.Globalization;

namespace TestConsoleApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(ISOWeek.GetWeeksInYear(DateTime.UtcNow.Year));
        }
    }
}
