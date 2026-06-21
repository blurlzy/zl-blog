namespace ZLBlog.Requests
{
     public class ListPopularBlogsRequest : IRequest<PagedList<SimpleBlogDto>>
     {
          public int PageIndex { get; init; }
          public int PageSize { get; init; }
     }

     public class ListPopularBlogsHandler : IRequestHandler<ListPopularBlogsRequest, PagedList<SimpleBlogDto>>
     {
          private readonly BlogRepository _blogRepo;
          private readonly IMapper _mapper;

          // ctor
          public ListPopularBlogsHandler(BlogRepository blogRepo, IMapper mapper)
          {
               _blogRepo = blogRepo;
               _mapper = mapper;
          }
          public async Task<PagedList<SimpleBlogDto>> Handle(ListPopularBlogsRequest request, CancellationToken cancellationToken)
          {
               var pagedList = await _blogRepo.GetPopularBlogsAsync(request.PageIndex, request.PageSize, false);

               // map to simple dto
               var pagedData = _mapper.Map<List<SimpleBlogDto>>(pagedList.Data);

               return new PagedList<SimpleBlogDto>(pagedList.Total, pagedData);
          }
     }
}
