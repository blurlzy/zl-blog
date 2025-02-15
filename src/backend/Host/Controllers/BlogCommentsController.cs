
namespace ZLBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogCommentsController : ApiBaseController
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> CreateAsync([FromBody] CommnetDto model)
        {
            var req = new AddCommentRequest
            {
                BlogId = model.BlogId,
                CommentText = model.CommentText,
                By = model.By
            };

            var newComment = await base.Mediator.Send(req);
            return Ok(newComment);
        }
    }
}
