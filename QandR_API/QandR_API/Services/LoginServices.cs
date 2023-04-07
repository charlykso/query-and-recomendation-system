using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QandR_API.Collective;
using QandR_API.DTO;
using QandR_API.Models;
using QandR_API.Repo;

namespace QandR_API.Services
{
    public class LoginServices : ILogin
    {
        private readonly QandR_DBContext _dbContext;
        private readonly IConfiguration _iconfig;
        private readonly IMapper _imapper;
        public LoginServices(QandR_DBContext dbContext, IConfiguration iconfig, IMapper imapper)
        {
            _dbContext = dbContext;
            _iconfig = iconfig;
            _imapper = imapper;
        }

        public async Task<Login_DTO> AuthenticateUser(string email, string password)
        {
            try
            {
                var user = await _dbContext.Students.Where(s => s.Email == email).FirstOrDefaultAsync();

                if (user == null)
                {
                    var lecturer = await _dbContext.Lecturers.Where(l => l.Email == email).FirstOrDefaultAsync();

                    if (lecturer == null)
                    {
                        return null!;
                    }
                    if (PasswordFunc.verifyPassword(lecturer.PasswordHash, password))
                    {
                        var loginUser = _imapper.Map<Login_DTO>(lecturer);

                        return loginUser;
                    }
                }
                if (PasswordFunc.verifyPassword(user!.PasswordHash, password))
                {
                    var loginUser = _imapper.Map<Login_DTO>(user);
                    return loginUser;
                }
                return null!;
            }
            catch (Exception)
            {

                return null!;
            }
        }

        public async Task<Login_DTO> LoginAsync(string email, string password)
        {
            try
            {
                var user = await AuthenticateUser(email, password);
                if (user == null)
                {
                    return null!;
                }
                var genToken = new GenerateToken(_iconfig);
                var tokenUser = _imapper.Map<Token_DTO>(user);
                var token = genToken.generateToken(tokenUser);
                user.Token = token;
                return user;
            }
            catch (Exception)
            {

                return null!;
            }
        }
    }
}
