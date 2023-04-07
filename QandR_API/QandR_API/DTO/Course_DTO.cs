namespace QandR_API.DTO
{
    public class Course_DTO
    {
        public Guid Id { get; set; }
        public string? Course_code { get; set; }
        public string? Course_title { get; set; }
        public string? Level { get; set; }
        public DateTime? Created_at { get; set; }
        public DateTime? Update_at { get; set; }
        public int Unit { get; set; }
    }
}
