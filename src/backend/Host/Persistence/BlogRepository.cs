
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

        // search blogs
        public async Task<PagedList<Blog>> SearcchBlogsAsync(string keyword, int skip = 0, int count = 12, bool includeDeletedItems = false)
        {
            if(string.IsNullOrEmpty(keyword))
            {
                return await _context.ListBlogsAsync(skip, count, includeDeletedItems);
            }


            return await _context.SearchBlogsAsync(keyword, skip, count, includeDeletedItems);
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
