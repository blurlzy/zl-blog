
namespace ZLBlog.Requests
{
    public record ListBlogsRequest: IRequest<PagedList<SimpleBlogDto>>
    {
        public string? Keywords { get; init; }
        public int PageIndex { get; init; }
        public int PageSize { get; init; }
    }

    public class ListBlogHander : IRequestHandler<ListBlogsRequest, PagedList<SimpleBlogDto>>
    {
        private readonly BlogRepository _blogRepo;
        private readonly IMapper _mapper;
          
        // ctor
        public ListBlogHander(BlogRepository blogRepo, IMapper mapper)
        {
            _blogRepo = blogRepo;
            _mapper = mapper;
        }

        public async Task<PagedList<SimpleBlogDto>> Handle(ListBlogsRequest request, CancellationToken cancellationToken)
        {
            var pagedList = await _blogRepo.SearcchBlogsAsync(request.Keywords ?? string.Empty, request.PageIndex, request.PageSize, true, false);

               // map to simple dto
               var pagedData = _mapper.Map<List<SimpleBlogDto>>(pagedList.Data);
               return new PagedList<SimpleBlogDto>(pagedList.Total, pagedData);
          }
    }
}
