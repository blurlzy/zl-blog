
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
            var req = new SearchcBlogAdminRequest { Keyword = keyword ?? string.Empty, PageIndex = pageIndex, PageSize = pageSize};
            return await base.Mediator.Send(req);
        }

        [HttpGet("blogs/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<Blog> GetBlogAsync(string id)
        {
            return await base.Mediator.Send(new  GetBlogAdminRequest { Id = id });
        }


        [HttpPost("blogs")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> CreateBlogAsync([FromBody] UpsetBlogDto model)
        {

            var req = new CreateBlogAdminRequest 
            { 
                Title = model.Title, 
                Content = model.Content, 
                Tags = model.Tags, 
                UserId = base.IdentityName, 
                UserName = base.Auth0UserProfileName 
            };

            // send
            var newBlog = await base.Mediator.Send(req);
            return Ok(new { id = newBlog.Id });
        }

        [HttpPut("blogs/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> UpdateBlogAsync(string id, [FromBody] UpsetBlogDto model)
        {
            var req = new UpdateBlogAdminRequest 
            { 
                Id = id, 
                Title = model.Title, 
                Content = model.Content,
                Tags = model.Tags,
                UserId = base.IdentityName, 
                UserName = base.Auth0UserProfileName 
            };

            var blog = await base.Mediator.Send(req);
            return Ok(new { blog });
        }

        [HttpPost("blogs/{id}/publish")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> PublishAsync(string id)
        {
            var req = new PublishBlogAdminRequest { Id = id };

            await base.Mediator.Send(req);

            return Ok();
        }

        [HttpPut("blogs/{id}/archive")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> ArchiveAsync(string id, [FromBody] ArchiveBlobAdminRequest req)
        {
            await base.Mediator.Send(req);
            return Ok();    
        }

    }
}
