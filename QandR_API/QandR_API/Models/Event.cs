using System.ComponentModel.DataAnnotations;

namespace QandR_API.Models
{
    public class Event
    {
        public string? Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Type { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Course_code { get; set; }
        public DateTime? Created_at { get; set; }
        public DateTime? Update_at { get; set; }

        public string? LecturerId { get; set; }

        public Lecturer? Lecturer { get; set; }

        public string? StudentId { get; set; }

        public Student? Student { get; set; }
    }
}
