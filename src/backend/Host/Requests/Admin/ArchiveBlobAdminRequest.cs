
namespace ZLBlog.Requests
{
    public record ArchiveBlobAdminRequest: IRequest<Blog>
    {
        public string Id { get; init; }
        public bool IsArchived { get; init; }
    }

    public class ArchciveBlogAdminHandler : IRequestHandler<ArchiveBlobAdminRequest, Blog>
    {
        private readonly BlogRepository _blogRepository;
        public ArchciveBlogAdminHandler(BlogRepository blogRepo)
        {
                _blogRepository = blogRepo;
        }

        public async Task<Blog> Handle(ArchiveBlobAdminRequest request, CancellationToken cancellationToken)
        {
            return await _blogRepository.ArchiveAsync(request.Id, request.IsArchived);
        }
    }

}
