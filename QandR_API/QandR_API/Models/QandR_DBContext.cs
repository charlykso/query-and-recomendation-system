using Microsoft.EntityFrameworkCore;

namespace QandR_API.Models
{
    public class QandR_DBContext : DbContext
    {
        public QandR_DBContext(DbContextOptions<QandR_DBContext> options) : base(options)
        {

        }
        public DbSet<Student> Students { get; set; } = null!;
        public DbSet<Course> Courses { get; set; } = null!;
        public DbSet<Lecturer> Lecturers { get; set; } = null!; 
        public DbSet<Event> Events { get; set; } = null!;
        public DbSet<Lecturer_Course> Lecturer_Courses { get; set; } = null!;
    }
}
