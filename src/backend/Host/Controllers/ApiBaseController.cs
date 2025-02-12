

namespace ZLBlog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiBaseController : ControllerBase
    {
        // ! (null-forgiving) operator
        // By using the null-forgiving operator, you inform the compiler that passing null is expected and shouldn't be warned about.
        private ISender _mediator = null!;

        // return the instance of MediatR
        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();

        // return identity name
        protected string IdentityName => (User.Identity != null && User.Identity.IsAuthenticated) ? User.Identity.Name ?? string.Empty : string.Empty;
    }
}
