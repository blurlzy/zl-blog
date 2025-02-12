

namespace ZLBlog.Requests
{
    public class CreateBlogRequest : IRequest<BlogDto>
    {
        public string Title { get; set; }
        public string Content { get; set; }
    }

    public class CreateBlogHandler : IRequestHandler<CreateBlogRequest, BlogDto>
    {
        private readonly BlogRepository _blogRepo;
        private readonly IMapper _mapper;

        //  ctor
        public CreateBlogHandler(BlogRepository blogRepo, IMapper mapper)
        {
            _blogRepo = blogRepo;
            _mapper = mapper;
        }

        public async Task<BlogDto> Handle(CreateBlogRequest request, CancellationToken cancellationToken)
        {
            var newBlog = new Blog(request.Title, request.Content, "zongyi", "zongyi");

            // create
            await _blogRepo.CreateAsync(newBlog);

            // map
            return _mapper.Map<BlogDto>(newBlog);
        }
    }
}
