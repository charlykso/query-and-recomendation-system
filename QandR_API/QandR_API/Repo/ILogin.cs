using QandR_API.DTO;
using QandR_API.Models;

namespace QandR_API.Repo
{
    public interface ILogin
    {
        public Task<Login_DTO> LoginAsync(string email, string password);
        public Task<Login_DTO> AuthenticateUser(string email, string password);

    }
}
