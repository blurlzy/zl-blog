
namespace ZLBlog.Requests
{
    public class SearchcBlogAdminRequest: IRequest<PagedList<SimpleBlogDto>>
    {
        public string Keyword { get; set; }
        public int PageIndex { get; init; }
        public int PageSize { get; init; }
        public bool IncludeDeletedItems { get; set; }
    }

    public class SearchBlogAdminHandler : IRequestHandler<SearchcBlogAdminRequest, PagedList<SimpleBlogDto>>
    {
        private readonly BlogRepository _blogRepo;
        private readonly IMapper _mapper;

        // ctor
        public SearchBlogAdminHandler(BlogRepository blogRepo, IMapper mapper)
        {
            _blogRepo = blogRepo;
            _mapper = mapper;
        }

        public async Task<PagedList<SimpleBlogDto>> Handle(SearchcBlogAdminRequest request, CancellationToken cancellationToken)
        {
            var pagedList = await _blogRepo.SearcchBlogsAsync(request.Keyword, request.PageIndex, request.PageSize, request.IncludeDeletedItems);

            // convert
            var pagedData = _mapper.Map<List<SimpleBlogDto>>(pagedList.Data);

            return new PagedList<SimpleBlogDto>(pagedList.Total, pagedData);

        }
    }
}
