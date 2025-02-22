
namespace ZLBlog.Persistence
{
    public class BlogCommentRepository
    {
        private readonly CosmosDbBlogCommentContext _context;

        public BlogCommentRepository(CosmosDbBlogCommentContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BlogComment>> GetCommentsAsync(string blogId)
        {
            return await _context.ListCommentsAsync(blogId);
        }

        public async Task<PagedList<BlogComment>> GetCommentsAsync(int pageIndex, int pageSize)
        {
            return await _context.ListCommentsAysnc(pageIndex, pageSize);
        }

        public async Task<BlogComment> CreateAsync(BlogComment comment)
        {
            return await _context.CreateAsync(comment, comment.BlogId);
        }

        public async Task DeleteAsync(string id, string blogId)
        {
            await _context.DeleteAsync(id, blogId);
        }
    }
}
