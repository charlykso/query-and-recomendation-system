using Microsoft.AspNetCore.Mvc;
using QandR_API.DTO;
using QandR_API.Models;

namespace QandR_API.Repo
{
    public interface IStudent
    {
        public Task<IEnumerable<Student>> GetStudents();
        public Task<Student> GetStudent(string id);
        public Task<string> UpdateStudent(string id, Student_DTO student);
        public Task<string> DeleteStudent(string id);
        public Task<string> CreateStudent(Student_DTO student);
        public Task<bool> CheckStudentEmail(string email);
    }
}
