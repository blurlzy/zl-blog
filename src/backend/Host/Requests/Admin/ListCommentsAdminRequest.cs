
namespace ZLBlog.Requests
{
    public record ListCommentsAdminRequest: IRequest<PagedList<BlogComment>>
    {
        public int PageIndex { get; init; }
        public int PageSize { get; init; }
    }

    public class ListCommentsAdminHandler : IRequestHandler<ListCommentsAdminRequest, PagedList<BlogComment>>
    {
        private readonly BlogCommentRepository _commentRepo;

        // ctor
        public ListCommentsAdminHandler(BlogCommentRepository commentRepo)
        {
            _commentRepo = commentRepo;                
        }

        public async Task<PagedList<BlogComment>> Handle(ListCommentsAdminRequest request, CancellationToken cancellationToken)
        {
            return await _commentRepo.GetCommentsAsync(request.PageIndex, request.PageSize);
        }
    }
}
