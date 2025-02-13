
using ZLBlog.Auth.Auth0;

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

        // return identity name (unique user id)
        protected string IdentityName => (User.Identity != null && User.Identity.IsAuthenticated) ? User.Identity.Name ?? string.Empty : string.Empty;

        // email
        protected string Auth0Email
        {
            get
            {
                if (User.Identity == null || !User.Identity.IsAuthenticated)
                {
                    return string.Empty;
                }

                return User.Claims.FirstOrDefault(c => c.Type == Auth0ClaimTypes.Email)?.Value ?? string.Empty;
            }
        }

        protected string Auth0UserProfileName
        {
            get
            {
                if (User.Identity == null || !User.Identity.IsAuthenticated)
                {
                    return string.Empty;
                }

                return User.Claims.FirstOrDefault(c => c.Type == Auth0ClaimTypes.Name)?.Value ?? string.Empty;
            }
        }
    }
}
