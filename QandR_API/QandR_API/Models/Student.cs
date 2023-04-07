using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace QandR_API.Models
{
    public class Student : IdentityUser
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^([A-Za-z-.']+)$", ErrorMessage = "format not accepted")]
        public string? Firstname { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^([A-Za-z-.']+)$", ErrorMessage = "format not accepted")]
        public string? Lastname { get; set; }

        [MaxLength(10)]
        public string? Role { get; set; } = "User";

        [Required]
        [MaxLength(20)]
        public string? RegNo { get; set; }

        [MaxLength(10)]
        public string? Gender { get; set; }
        public List<Event>? Events { get; set; }
        public DateTime? Created_at { get; set; }
        public DateTime? Updated_at { get; set; }
        public string? SearchString { get; set; }
    }
}
