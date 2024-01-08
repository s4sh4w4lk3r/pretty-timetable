namespace Auth
{
    public static class KeycloakPolicies
    {
        /// <summary>
        /// Политика только для чтения данных.
        /// </summary>
        public const string TimetableR = "timetable-r";


        /// <summary>
        /// Политика для проведения любых операций с данными.
        /// </summary>
        public const string TimetableCRUD = "timetable-crud";
    }
}
