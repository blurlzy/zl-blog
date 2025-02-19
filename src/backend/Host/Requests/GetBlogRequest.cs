
namespace ZLBlog.Requests
{
    public record GetBlogRequest: IRequest<Blog>
    {
        public string Id { get; init; }   
    }

    public class GetBlogHandler : IRequestHandler<GetBlogRequest, Blog>
    {
        private readonly BlogRepository _blogRepo;
        private readonly IMapper _mapper;
        // ctor
        public GetBlogHandler(BlogRepository blogRepo, IMapper mapper)
        {
            _blogRepo = blogRepo;
            _mapper = mapper;
        }

        public async Task<Blog> Handle(GetBlogRequest request, CancellationToken cancellationToken)
        {
            return await _blogRepo.GetBlogAsync(request.Id);
        }
    }
}
