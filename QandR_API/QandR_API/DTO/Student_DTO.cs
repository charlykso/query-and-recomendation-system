using Microsoft.AspNetCore.Identity;
using QandR_API.Models;

namespace QandR_API.DTO
{
    public class Student_DTO : IdentityUser
    {
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Role { get; set; }
        public string? RegNo { get; set; }
        public string? Gender { get; set; }
        public string? Password { get; set; }
    }
}
