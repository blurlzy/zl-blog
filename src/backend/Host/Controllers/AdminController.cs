
using ZLBlog.Requests;

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

        [Route("blogs")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> CreateBlogAsync([FromBody] CreateBlogRequest req)
        {
            // send
            await base.Mediator.Send(req);
            return Ok();
        }
    }
}
