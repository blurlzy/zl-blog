

namespace ZLBlog.Requests
{
    public record CreateBlogRequest : IRequest<Blog>
    {
        public string Title { get; init; }
        public string Content { get; init; }
        public string Tags { get; init; }
    }

    public class CreateBlogHandler : IRequestHandler<CreateBlogRequest, Blog>
    {
        private readonly BlogRepository _blogRepo;
        private readonly IMapper _mapper;

        //  ctor
        public CreateBlogHandler(BlogRepository blogRepo, IMapper mapper)
        {
            _blogRepo = blogRepo;
            _mapper = mapper;
        }

        public async Task<Blog> Handle(CreateBlogRequest request, CancellationToken cancellationToken)
        {
            var newBlog = new Blog(request.Title, request.Content, Array.Empty<string>(), "zongyi", "zongyi");

            // create
            return await _blogRepo.CreateAsync(newBlog);

        }
    }
}
