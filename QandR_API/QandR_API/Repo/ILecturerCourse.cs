using QandR_API.DTO;
using QandR_API.Models;

namespace QandR_API.Repo
{
    public interface ILecturerCourse
    {
        public Task<IEnumerable<Lecturer_Course>> GetLecturerCourses();
        public Task<Lecturer_Course> GetLecturerCourse(string id);
        public Task<string> UpdateLecturerCourse(string id, Lecturer_Course_DTO l_course);
        public Task<string> DeleteLecturerCourse(string id);
        public Task<string> CreateLecturerCourse(Lecturer_Course_DTO l_course);
    }
}
