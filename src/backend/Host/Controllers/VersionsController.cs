
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
            return Ok(new { version = "ZL Blog APIs v2.0 - 202512.01" });
        }


        //[HttpGet("Error")]
        //[Produces("application/json")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public IActionResult Temp()
        //{
        //    throw new Exception("This is a test exception for demo purposes.");
        //}
    }
}
