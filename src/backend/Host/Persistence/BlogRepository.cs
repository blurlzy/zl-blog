

namespace ZLBlog.Persistence
{
    public class BlogRepository
    {
        private readonly CosmosDbBlogContext _context;

        // ctor
        public BlogRepository(CosmosDbBlogContext context)
        {
                _context = context;
        }

        // get latest blogs
        public async Task<IEnumerable<Blog>> ListBlogsAsync(int skip = 0, int count = 12)
        {
            return await _context.QueryEntitiesAsync(skip, count);
        }

        
        // create blog
        public async Task<Blog> CreateAsync(Blog blog)
        {
            return await _context.CreateAsync(blog, blog.Partition);
        } 
        
        // delete blog
        public async Task DeleteAsync(string id)
        {
            await _context.DeleteAsync(id, id);
        }

    }
}
