

namespace ZLBlog.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BlobsController : ApiBaseController
    {
        // list blog images
        [HttpGet("blog-images")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IEnumerable<BlobDto>> GetLatestBlogImages()
        {
            var req = new ListBlogImagesAdminRequest { Top = 20 };

            return await base.Mediator.Send(req);
        }

        // upload images 
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> UploadBlogImagesAsync([FromForm] IFormCollection data)
        {
            var uploadedFiles = Request.Form.Files.Select(m => new FileUploadDto { FileExtension = Path.GetExtension(m.FileName), FileStream = m.OpenReadStream() })
                                                  .ToList();


            var req = new UploadBlogImagesAdminRequest { Files = uploadedFiles, UserId = base.IdentityName, UserEmail = base.Auth0Email };
            await base.Mediator.Send(req);

            return Ok();
        }
    }
}
