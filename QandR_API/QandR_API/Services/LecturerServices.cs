using Microsoft.EntityFrameworkCore;
using QandR_API.Collective;
using QandR_API.DTO;
using QandR_API.Models;
using QandR_API.Repo;
using AutoMapper;

namespace QandR_API.Services
{
    public class LecturerServices : ILecturer
    {
        private readonly QandR_DBContext? _dbContext;
        private readonly IMapper _imapper;
        public LecturerServices(QandR_DBContext? dbContext, IMapper imapper)
        {
            _dbContext = dbContext;
            _imapper = imapper;
        }

        public async Task<bool> CheckLecturerEmail(string email)
        {
            var exists = await _dbContext!.Lecturers.FirstOrDefaultAsync(e => e.Email == email);
            if (exists == null)
            {
                return false;
            }
            return true;
        }

        public async Task<string> CreateLecturer(Lecturer_DTO lecturer)
        {
            try
            {
                var emailExists = await CheckLecturerEmail(lecturer.Email);
                if (emailExists)
                {
                    return "Email already exists";
                }
                var newLecturer = _imapper.Map<Lecturer>(lecturer);
                
                newLecturer.Created_at = DateTime.Now;
                newLecturer.Updated_at = DateTime.Now;
                newLecturer.PasswordHash = PasswordFunc.hashPassword(lecturer.Password!);
                newLecturer.SearchString = lecturer.Firstname!.ToUpper() + " "
                    + lecturer.Lastname!.ToUpper() + " " + lecturer.Email.ToUpper() + " "
                    + lecturer.Gender!.ToUpper() + " " + lecturer.Title!.ToUpper()+" "
                    +lecturer.Marital_status!.ToUpper();
                if (lecturer.Role == null)
                {
                    newLecturer.Role = "User";
                }
                else
                {
                    newLecturer.Role = lecturer.Role;
                }


                var lect = await _dbContext!.Lecturers.AddAsync(newLecturer);
                if (lect == null)
                {
                    throw new Exception("Something went wrong");
                }
                await _dbContext.SaveChangesAsync();
                return "Lecturer created";
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<string> DeleteLecturer(string id)
        {
            try
            {
                var lecturer = await _dbContext!.Lecturers.FindAsync(id);
                if (lecturer == null)
                {
                    throw new Exception("Lecturer not found");
                }
                _dbContext!.Lecturers.Remove(lecturer);
                _dbContext.SaveChanges();
                return "Deleted successfuly";

            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public async Task<Lecturer> GetLecturer(string id)
        {
            try
            {
                var lecturer = await _dbContext!.Lecturers.Where(l => l.Id == id)
                    .Include(e => e.Events)
                    .Include(c => c.Lecturer_Courses)
                    .FirstOrDefaultAsync();

                if(lecturer == null)
                {
                    Console.WriteLine("Lecturer not found");
                    return null!;
                }
                return lecturer;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null!;
            }
        }

        public async Task<IEnumerable<Lecturer>> GetLecturers()
        {
            try
            {
                var lecturers = await _dbContext!.Lecturers
                    .OrderByDescending(l => l.Created_at)
                    .Include(e => e.Events)
                    .Include(c => c.Lecturer_Courses)!.ThenInclude(c => c.Course)
                    .ToListAsync();

                if (lecturers.Count == 0)
                {
                    return null!;
                }
                return lecturers;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null!;
            }
        }

        public async Task<string> UpdateLecturer(string id, Lecturer_DTO lecturer)
        {
            try
            {
                var editLecturer = await _dbContext!.Lecturers.FindAsync(id);
                if (editLecturer == null)
                {
                    throw new Exception("Lecturer not found");
                }
                editLecturer.Firstname = lecturer.Firstname;
                editLecturer.Lastname = lecturer.Lastname;
                editLecturer.Email = lecturer.Email;
                editLecturer.Gender = lecturer.Gender;
                editLecturer.PhoneNumber = lecturer.PhoneNumber;
                editLecturer.Title = lecturer.Title;
                editLecturer.Marital_status = lecturer.Marital_status;
                editLecturer.Updated_at = DateTime.Now;
                editLecturer.Role = lecturer.Role;
                editLecturer.SearchString = lecturer.Firstname!.ToUpper() + " "
                    + lecturer.Lastname!.ToUpper() + " " + lecturer.Email.ToUpper() + " "
                    + lecturer.Gender!.ToUpper() + " " + lecturer.Title!.ToUpper() + " "
                    + lecturer.Marital_status!.ToUpper();

                _dbContext.Lecturers.Attach(editLecturer);
                _dbContext.SaveChanges();

                return "Lecturer updated";
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                return (ex.Message);
            }
        }
    }
}
