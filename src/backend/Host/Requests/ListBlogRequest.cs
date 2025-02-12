
namespace ZLBlog.Requests
{
    public record ListBlogRequest: IRequest<IEnumerable<Blog>>
    {
        public int PageIndex { get; init; }
        public int PageSize { get; init; }
    }

    public class ListBlogHander : IRequestHandler<ListBlogRequest, IEnumerable<Blog>>
    {
        private readonly BlogRepository _blogRepo;

        // ctor
        public ListBlogHander(BlogRepository blogRepo)
        {
            _blogRepo = blogRepo;
        }

        public async Task<IEnumerable<Blog>> Handle(ListBlogRequest request, CancellationToken cancellationToken)
        {
            return await _blogRepo.ListBlogsAsync(request.PageIndex, request.PageSize);
        }
    }
}
