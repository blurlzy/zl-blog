
namespace ZLBlog.Requests
{
    public record ListBlogRequest: IRequest<PagedList<Blog>>
    {
        public int PageIndex { get; init; }
        public int PageSize { get; init; }
    }

    public class ListBlogHander : IRequestHandler<ListBlogRequest, PagedList<Blog>>
    {
        private readonly BlogRepository _blogRepo;

        // ctor
        public ListBlogHander(BlogRepository blogRepo)
        {
            _blogRepo = blogRepo;
        }

        public async Task<PagedList<Blog>> Handle(ListBlogRequest request, CancellationToken cancellationToken)
        {
            return await _blogRepo.SearcchBlogsAsync(string.Empty, request.PageIndex, request.PageSize, false);
        }
    }
}
