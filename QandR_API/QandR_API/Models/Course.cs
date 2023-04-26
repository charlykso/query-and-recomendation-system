using System.ComponentModel.DataAnnotations;

namespace QandR_API.Models
{
    public class Course
    {
        public string? Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Course_code { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Course_title { get; set; }

        [MaxLength(10)]
        public string? Level { get; set; }
        public DateTime? Created_at { get; set; }
        public DateTime? Updated_at { get; set; }
        public List<Lecturer_Course>? lecturer_Courses { get; set; }
        public string? SearchString { get; set; }
        public int Unit { get; set; }
    }
}
