using QandR_API.DTO;
using QandR_API.Models;

namespace QandR_API.Repo
{
    public interface ICourse
    {
        public Task<IEnumerable<Course>> GetCourses();
        public Task<Course> GetCourse(string id);
        public Task<string> UpdateCourse(string id, Course_DTO course);
        public Task<string> DeleteCourse(string id);
        public Task<string> CreateCourse(Course_DTO course);
        public Task<bool> CheckCourseExist(string course_code);
    }
}
