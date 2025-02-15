
namespace ZLBlog.Requests
{
    public record ListBlogsRequest: IRequest<PagedList<Blog>>
    {
        public string? Keywords { get; init; }
        public int PageIndex { get; init; }
        public int PageSize { get; init; }
    }

    public class ListBlogHander : IRequestHandler<ListBlogsRequest, PagedList<Blog>>
    {
        private readonly BlogRepository _blogRepo;

        // ctor
        public ListBlogHander(BlogRepository blogRepo)
        {
            _blogRepo = blogRepo;
        }

        public async Task<PagedList<Blog>> Handle(ListBlogsRequest request, CancellationToken cancellationToken)
        {
            return await _blogRepo.SearcchBlogsAsync(request.Keywords ?? string.Empty, request.PageIndex, request.PageSize, true, false);
        }
    }
}
