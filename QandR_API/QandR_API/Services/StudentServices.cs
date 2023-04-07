using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QandR_API.Collective;
using QandR_API.DTO;
using QandR_API.Models;
using QandR_API.Repo;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;

namespace QandR_API.Services
{
    public class StudentServices : IStudent
    {
        private readonly QandR_DBContext? _dbContext;
        private readonly IMapper _imapper;

        public StudentServices(QandR_DBContext? dbContext, IMapper imapper)
        {
            _dbContext = dbContext;
            _imapper = imapper;
        }

        public async Task<bool> CheckStudentEmail(string email)
        {
            var exists = await _dbContext!.Students.FirstOrDefaultAsync(e => e.Email == email);
            if (exists == null)
            {
                return false;
            }
            return true;
        }

        public async Task<string> CreateStudent(Student_DTO student)
        {
            try
            {
                var emailExists = await CheckStudentEmail(student.Email);
                if (emailExists)
                {
                    return "Email already exists";
                }
                var newStudent = _imapper.Map<Student>(student);
                newStudent.Created_at = DateTime.Now;
                newStudent.Updated_at = DateTime.Now;
                newStudent.PasswordHash = PasswordFunc.hashPassword(student.Password!);
                newStudent.SearchString = student.Firstname!.ToUpper() + " "
                    + student.Lastname!.ToUpper() + " " + student.Email.ToUpper() + " "
                    + student.Gender!.ToUpper() + " " + student.RegNo!.ToUpper();
                if (student.Role == null)
                {
                    newStudent.Role = "User";
                }
                else
                {
                    newStudent.Role = student.Role;
                }


                var stu = await _dbContext!.Students.AddAsync(newStudent);
                if (stu == null)
                {
                    throw new Exception("Something went wrong");
                }
                await _dbContext.SaveChangesAsync();
                return "Student created";
            }catch (System.Exception ex)
            {
                return ex.Message;
            }
            
        }

        public async Task<string> DeleteStudent(string id)
        {
            try
            {
                var student = await _dbContext!.Students.FindAsync(id);
                if (student == null)
                {
                    throw new Exception("Student not found");
                }
                _dbContext!.Remove(student);
                _dbContext.SaveChanges();
                return "Deleted successfuly";
            }catch (System.Exception ex)
            {
                return ex.Message;
            }
            
          
        }

        public async Task<Student> GetStudent(string id)
        {
            try
            {
                var student = await _dbContext!.Students.Where(s => s.Id == id).Include(se => se.Events)!.ThenInclude(l => l.Lecturer).FirstOrDefaultAsync();
                if (student == null)
                {
                    Console.WriteLine("Student not found");
                    return null!;
                }
                return student;
            } catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null!;
            }
        }

        public async Task<IEnumerable<Student>> GetStudents()
        {
            try
            {
                var students = await _dbContext!.Students.OrderBy(x => x.Firstname)
                    .Include(se => se.Events)!.ThenInclude(l => l.Lecturer)
                    .ToListAsync();
                if (students.Count == 0)
                {
                    return null!;
                }
                return students;
            } catch (System.Exception)
            {
                return null!;
            }
        }

        

        public async Task<string> UpdateStudent(string id, Student_DTO student)
        {
            try
            {
                var editStudent = await _dbContext!.Students.FindAsync(id);
                if (editStudent == null)
                {
                    throw new Exception("Student not found");
                }
                editStudent.Firstname = student.Firstname;
                editStudent.Lastname = student.Lastname;
                editStudent.Email = student.Email;
                editStudent.Gender = student.Gender;
                editStudent.PhoneNumber = student.PhoneNumber;
                editStudent.RegNo = student.RegNo;
                editStudent.Updated_at = DateTime.Now;
                editStudent.Role = student.Role;
                editStudent.SearchString = student.Firstname!.ToUpper() + " "
                    + student.Lastname!.ToUpper() + " " + student.Email.ToUpper() + " "
                    + student.Gender!.ToUpper() + " " + student.RegNo!.ToUpper();

                _dbContext.Students.Attach(editStudent);
                await _dbContext.SaveChangesAsync();

                return "Student updated";
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return (ex.Message);
            }
        }
    }
}

