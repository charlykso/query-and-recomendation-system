using System.ComponentModel.DataAnnotations;

namespace QandR_API.Models
{
    public class Lecturer_Course
    {
        public string? Id { get; set; }

        public string? LecturerId { get; set; }
        public Lecturer? Lecturer { get; set; }

        public string? CourseId { get; set; }
        public Course? Course { get; set; }
        public DateTime? Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
