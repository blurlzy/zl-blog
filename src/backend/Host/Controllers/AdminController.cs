
namespace ZLBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ApiBaseController
    {
        private readonly ILogger<AdminController> _logger;

        // ctor
        public AdminController(ILogger<AdminController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        [HttpGet("version")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public IActionResult GetAdminPortalVersion()
        {
            // check current user
            var user = User.Identity.Name;
            var claims = User.Claims;

            return Ok(new { version = "ZL Blog Admin Portal v1.0" });
        }

        [Route("blogs")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> CreateBlogAsync([FromBody] CreateBlogRequest req)
        {
            // test ONLY
            req.UserId = "admin@zlblog.com";
            req.UserName = "admin";

            // send
            await base.Mediator.Send(req);
            return Ok();
        }
    }
}
