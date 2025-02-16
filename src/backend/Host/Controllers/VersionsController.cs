
namespace ZLBlog.Controllers
{
    [Route("")]
    [ApiController]
    public class VersionsController : ApiBaseController
    {
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetVersion()
        {
            return Ok(new { version = "ZL Blog APIs v1.0 - 202502.2" });
        }
    }
}
