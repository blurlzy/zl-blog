
namespace ZLBlog.Requests
{
    public record AddCommentRequest: IRequest<BlogComment>
    {
        public string BlogId { get; init; }
        public string CommentText { get; init; }
        public string By { get; init; }
    }

    public class AddCommentHandler : IRequestHandler<AddCommentRequest, BlogComment>
    {
        private readonly BlogCommentRepository _blogCommentRepo;
        private readonly BlogRepository _blogRepo;

        // ctor
        public AddCommentHandler(BlogCommentRepository blogCommentrepo, BlogRepository blogRepo)
        {
            _blogCommentRepo = blogCommentrepo;
            _blogRepo = blogRepo;   
        }

        public async Task<BlogComment> Handle(AddCommentRequest request, CancellationToken cancellationToken)
        {
            // verify blog
            var blog = await _blogRepo.GetBlogAsync(request.BlogId);

            // add a new comment
            var newComment = new BlogComment(request.BlogId, request.CommentText, request.By, request.By);
            await _blogCommentRepo.CreateAsync(newComment);

            // update total comments
            var totalComments = blog.TotalComments ?? 0;

            // new
            blog.TotalComments = totalComments + 1; 
            // update
            await _blogRepo.UpdateAsyncc(blog);

            return newComment;
        }
    }
}
