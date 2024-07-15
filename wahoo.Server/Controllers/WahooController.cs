using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using wahoo.Server.Models;

namespace wahoo.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WahooController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public WahooController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("/pingauth")]
        [Authorize]
        public ActionResult PingAuth(ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);
            return email != null ? Ok() : BadRequest();
        }

        [HttpGet("/currentuser")]
        [Authorize]
        public async Task<ActionResult> GetCurrentUser()
        {
            var user = await _userManager.GetUserAsync(User);
            var email = user.Email;
            return email != null ? Ok(new { Email = email }) : BadRequest();
        }



    }
}
