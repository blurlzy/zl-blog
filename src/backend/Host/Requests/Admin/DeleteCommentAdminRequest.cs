
namespace ZLBlog.Requests
{
    public record DeleteCommentAdminRequest: IRequest<Unit>
    {
        public string BlogId { get; init; }
        public string Id { get; init; }
    }

    public class DeleteCommentAdminHandler : IRequestHandler<DeleteCommentAdminRequest, Unit>
    {
        private readonly BlogCommentRepository _commentRepo;
        private readonly BlogRepository _blogRepo;

        // ctor
        public DeleteCommentAdminHandler(BlogCommentRepository commentRepo, BlogRepository blogRepo)
        {
            _commentRepo = commentRepo;
            _blogRepo = blogRepo;
        }

        public async Task<Unit> Handle(DeleteCommentAdminRequest request, CancellationToken cancellationToken)
        {
            // get the blog 
            var blog = await _blogRepo.GetBlogAsync(request.BlogId);

            // delete the comment
            await _commentRepo.DeleteAsync(request.Id, request.BlogId);

            // Get the existing total, defaulting to 0 if null
            var totalComments = blog.TotalComments ?? 0;

            blog.TotalComments = Math.Max(0, totalComments - 1);

            // update
            await _blogRepo.UpdateAsync(blog);

            return Unit.Value;
        }
    }
}
