

namespace ZLBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ApiBaseController
    {
        private readonly ILogger<BlogsController> _logger;

        public BlogsController(ILogger<BlogsController> logger)
        {
                _logger = logger;
        }


        [HttpGet]
        [EnsurePaginationFilter]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<PagedList<Blog>> ListBlogsAsync([FromQuery] int pageIndex = 0, int pageSize = 8)
        {
            var req = new ListBlogRequest { PageIndex = pageIndex, PageSize = pageSize };

            return await base.Mediator.Send(req);
        }

    }
}
