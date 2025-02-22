

namespace ZLBlog.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BlogCommentsController : ApiBaseController
    {

        [HttpGet]
        [EnsurePaginationFilter]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<PagedList<BlogComment>> ListCommentsAsync([FromQuery] int pageIndex, int pageSize)
        {
            var req = new ListCommentsAdminRequest { PageIndex = pageIndex, PageSize = pageSize };

            return await base.Mediator.Send(req);
        }


        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> CreateAsync([FromBody] CommnetDto model)
        {
            if (!ModelState.IsValid)
            {
                // If validation fails (CommentText > 250), return BadRequest with details
                return BadRequest(ModelState);
            }

            var req = new AddCommentRequest
            {
                BlogId = model.BlogId,
                CommentText = model.CommentText,
                By = model.By
            };

            var newComment = await base.Mediator.Send(req);
            return Ok(newComment);
        }

        [HttpDelete("{blogId}/{id}")]
        [ValidateGuid]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> DeleteAsync(string blogId, string id)
        {
            var req = new DeleteCommentAdminRequest { BlogId = blogId, Id = id };
            await base.Mediator.Send(req);

            return Ok();
        }
    }
}
