using Microsoft.AspNetCore.Identity;
using QandR_API.Models;

namespace QandR_API.DTO
{
    public class Lecturer_DTO : IdentityUser
    {
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Title { get; set; }
        public string? Marital_status { get; set; }
        public string? Gender { get; set; }
        public DateTime? Created_at { get; set; }
        public DateTime? Update_at { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
