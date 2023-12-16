namespace Exceptions
{
    public class StringNullOrEmptyException : Exception
    {
        private const string DEFAULT_MESSAGE = "Строка пустая, состоит из пробела или NULL.";
        public StringNullOrEmptyException() { }

        public StringNullOrEmptyException(string paramName) 
        {
            base.Source = paramName;
        }

        public StringNullOrEmptyException(string paramName, Exception inner): base(DEFAULT_MESSAGE, inner)
        {
            base.Source = paramName;
        }
    }
}
