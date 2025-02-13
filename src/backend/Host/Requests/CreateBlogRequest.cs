
namespace ZLBlog.Requests
{
    public record CreateBlogRequest : IRequest<Blog>
    {
        public string Title { get; init; }
        public string Content { get; init; }
        public string Tags { get; init; }
        public string UserId { get; set; }
        public string UserName { get; set; }
    }

    public class CreateBlogHandler : IRequestHandler<CreateBlogRequest, Blog>
    {
        private readonly BlogRepository _blogRepo;

        //  ctor
        public CreateBlogHandler(BlogRepository blogRepo)
        {
            _blogRepo = blogRepo;
        }

        public async Task<Blog> Handle(CreateBlogRequest request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Title))
            {
                throw new ArgumentNullException(nameof(request.Title));
            }

            if(string.IsNullOrEmpty(request.Content)) 
            {
                throw new ArgumentNullException(nameof(request.Content));
            }

            // new blog
            var newBlog = new Blog(request.Title, request.Content, request.Tags?.Split(","), request.UserId, request.UserName);
            // create
            return await _blogRepo.CreateAsync(newBlog);

        }
    }
}
