﻿

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
        [ValidateGuid]  // validates the route parameter 'id'
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetBlobAsync(string id)
        {
            var req = new GetBlogRequest { Id = id };
            var blog = await base.Mediator.Send(req);

            // if the blog is archived or unpublished
            if (blog.IsDeleted || !blog.Published)
            {
                return NotFound();
            }

            return Ok(blog);
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
        [ValidateGuid]  // validates the route parameter 'id'
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
