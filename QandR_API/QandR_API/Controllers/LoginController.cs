using Microsoft.AspNetCore.Mvc;
using QandR_API.Repo;

namespace QandR_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogin? _ilogin;
        public LoginController(ILogin? ilogin)
        {
            _ilogin = ilogin;
        }

        [HttpPost]
        public async Task<ActionResult> login([FromForm] string Email, [FromForm] string Password)
        {
            try
            {
                var user = await _ilogin!.LoginAsync(Email, Password);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
