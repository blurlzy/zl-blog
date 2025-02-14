
namespace ZLBlog.Requests
{
    public class UpdateBlogAdminRequest: IRequest<Blog>
    {
        public string Id { get; set; }
        public string Title { get; init; }
        public string Content { get; init; }
        public string Tags { get; init; }
        public string UserId { get; set; }
        public string UserName { get; set; }
    }

    public class UpdateBlogAdminHandler : IRequestHandler<UpdateBlogAdminRequest, Blog>
    {
        private readonly BlogRepository _blogRepo;
        // ctor
        public UpdateBlogAdminHandler(BlogRepository blogRepository)
        {
                _blogRepo = blogRepository;
        }

        public async Task<Blog> Handle(UpdateBlogAdminRequest request, CancellationToken cancellationToken)
        {
            var blog = await _blogRepo.GetBlogAsync(request.Id);

            // todo: check author

            // update
            blog.Title = request.Title;
            blog.Content = request.Content;
            blog.Tags = request.Tags?.Split(",");
            blog.UpdatedOn = DateTimeOffset.Now;

            // update
            return await _blogRepo.UpdateAsyncc(blog);
        }
    }
}
