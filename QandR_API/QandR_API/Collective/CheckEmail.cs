using Microsoft.EntityFrameworkCore;
using QandR_API.Models;

namespace QandR_API.Collective
{
    public class CheckEmail
    {
        private readonly QandR_DBContext? _dbContext;

        public CheckEmail(QandR_DBContext? dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Boolean> checkStudentEmail(string email)
        {
            var exists = await _dbContext!.Students.FirstOrDefaultAsync(e => e.Email == email);
            if (exists == null)
            {
                return false;
            }
            return true;
        }

        public async Task<Boolean> checkLecturerEmail(string email)
        {
            var exists = await _dbContext!.Lecturers.FirstOrDefaultAsync(e => e.Email == email);
            if (exists == null)
            {
                return false;
            }
            return true;
        }
    }
}
