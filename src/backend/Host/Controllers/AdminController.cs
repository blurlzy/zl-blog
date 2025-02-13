
namespace ZLBlog.Controllers
{
    [Authorize]
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

        [HttpGet("blogs")]
        [EnsurePaginationFilter]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<PagedList<SimpleBlogDto>> SearchBlogsAsync([FromQuery] string? keyword, int pageIndex = 0, int pageSize = 8)
        {
            var req = new SearchcBlogAdminRequest { Keyword = keyword ?? string.Empty, PageIndex = pageIndex, PageSize = pageSize, IncludeDeletedItems = true };
            return await base.Mediator.Send(req);
        }

        [HttpPost("blogs")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> CreateBlogAsync([FromBody] CreateBlogRequest req)
        {
  
            req.UserId = base.IdentityName;
            req.UserName = base.Auth0UserProfileName;

            // send
            await base.Mediator.Send(req);
            return Ok();
        }
    }
}
