
namespace ZLBlog.Requests
{
    public record ListBlogsByTagRequest: IRequest<PagedList<SimpleBlogDto>>
    {
        public string? Tag { get; init; }
        public int PageIndex { get; init; }
        public int PageSize { get; init; }
    }

    public class ListBlogByTagHandler : IRequestHandler<ListBlogsByTagRequest, PagedList<SimpleBlogDto>>
    {
        private readonly BlogRepository _blogRepo;
        private readonly IMapper _mapper;

        // ctor
        public ListBlogByTagHandler(BlogRepository blogRepo, IMapper mapper)
        {
                _blogRepo = blogRepo;
                _mapper = mapper;
        }

        public async Task<PagedList<SimpleBlogDto>> Handle(ListBlogsByTagRequest request, CancellationToken cancellationToken)
        {
            var pagedList = await _blogRepo.FilterBlogsAsync(request.Tag ?? string.Empty, request.PageIndex, request.PageSize, true, false);

            // map to simple dto
            var pagedData = _mapper.Map<List<SimpleBlogDto>>(pagedList.Data);
            return new PagedList<SimpleBlogDto>(pagedList.Total, pagedData);
        }
    }
}
