
namespace ZLBlog.Requests
{
    public record PublishBlogAdminRequest: IRequest<Blog>
    {
        public string Id { get; init; }
    }

    public class PublishBlogAdminHandler : IRequestHandler<PublishBlogAdminRequest, Blog>
    {
        private readonly BlogRepository _blogRepo;

        // ctor
        public PublishBlogAdminHandler(BlogRepository blogRepo)
        {
            _blogRepo = blogRepo;
        }

        public async Task<Blog> Handle(PublishBlogAdminRequest request, CancellationToken cancellationToken)
        {
            return await _blogRepo.PublishAsync(request.Id);
        }
    }
}
