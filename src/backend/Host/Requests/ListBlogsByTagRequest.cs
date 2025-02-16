
namespace ZLBlog.Requests
{
    public record ListBlogsByTagRequest: IRequest<PagedList<Blog>>
    {
        public string? Tag { get; init; }
        public int PageIndex { get; init; }
        public int PageSize { get; init; }
    }

    public class ListBlogByTagHandler : IRequestHandler<ListBlogsByTagRequest, PagedList<Blog>>
    {
        private readonly BlogRepository _blogRepo;

        // ctor
        public ListBlogByTagHandler(BlogRepository blogRepo)
        {
                _blogRepo = blogRepo;
        }

        public async Task<PagedList<Blog>> Handle(ListBlogsByTagRequest request, CancellationToken cancellationToken)
        {
            return await _blogRepo.FilterBlogsAsync(request.Tag ?? string.Empty, request.PageIndex, request.PageSize, true, false);
        }
    }
}
