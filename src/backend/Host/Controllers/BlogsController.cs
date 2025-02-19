

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
        public async Task<PagedList<Blog>> ListBlogsAsync([FromQuery] string? keywords, int pageIndex = 0, int pageSize = 8)
        {
            var req = new ListBlogsRequest { Keywords = keywords,  PageIndex = pageIndex, PageSize = pageSize };

            return await base.Mediator.Send(req);
        }

        [HttpGet("{id}")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<Blog> GetBlobAsync(string id)
        {
            var req = new GetBlogRequest { Id = id };
            return await base.Mediator.Send(req);
        }

        [HttpGet("tags/{tag}")]
        [EnsurePaginationFilter]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<PagedList<Blog>> ListBlogsByTagAsync(string tag, [FromQuery] int pageIndex = 0, int pageSize = 8)
        {
            var req = new ListBlogsByTagRequest { Tag = tag, PageIndex = pageIndex, PageSize = pageSize };

            return await base.Mediator.Send(req);   
        }

        [HttpGet("{id}/comments")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IEnumerable<BlogComment>> GetComments(string id)
        {
            var req = new ListCommentsRequest { BlogId = id };

            return await base.Mediator.Send(req);
        }
    }
}
