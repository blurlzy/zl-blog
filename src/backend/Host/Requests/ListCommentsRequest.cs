
namespace ZLBlog.Requests
{
    public record ListCommentsRequest: IRequest<IEnumerable<BlogComment>>
    {
        public string BlogId { get; init; }
    }

    public class ListCommentsHandler : IRequestHandler<ListCommentsRequest, IEnumerable<BlogComment>>
    {
        private readonly BlogCommentRepository _blogCommentRepo;
        private readonly BlogRepository _blogRepo;

        // ctor
        public ListCommentsHandler(BlogCommentRepository blogCommentRepo, BlogRepository blogRepo)
        {
            _blogCommentRepo = blogCommentRepo;
            _blogRepo = blogRepo;
        }

        public async Task<IEnumerable<BlogComment>> Handle(ListCommentsRequest request, CancellationToken cancellationToken)
        {
            // todo: validate blog

            return await _blogCommentRepo.GetCommentsAsync(request.BlogId);
        }
    }
}
