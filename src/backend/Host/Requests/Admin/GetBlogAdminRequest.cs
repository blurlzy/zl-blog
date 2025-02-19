
namespace ZLBlog.Requests
{
    public record GetBlogAdminRequest: IRequest<Blog>
    {
        public string Id { get; init; }
    }

    public class GetBlogAdminHandler : IRequestHandler<GetBlogAdminRequest, Blog>
    {
        private readonly BlogRepository _blogRepo;

        public GetBlogAdminHandler(BlogRepository blogRepo)
        {
            _blogRepo = blogRepo;
        }

        public async Task<Blog> Handle(GetBlogAdminRequest request, CancellationToken cancellationToken)
        {
            if(string.IsNullOrEmpty(request.Id))
            {
                throw new ArgumentNullException("id");
            }

            return await _blogRepo.GetBlogAsync(request.Id);
        }
    }
}
