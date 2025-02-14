
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
        public async Task<PagedList<Blog>> SearcchBlogsAsync(string keyword, int skip = 0, int count = 12, bool publishedOnly = true, bool includeDeletedItems = false)
        {
            if(string.IsNullOrEmpty(keyword))
            {
                return await _context.ListBlogsAsync(skip, count, publishedOnly, includeDeletedItems);
            }


            return await _context.SearchBlogsAsync(keyword, skip, count, publishedOnly, includeDeletedItems);
        }
        
        // get blog by id
        public async Task<Blog> GetBlogAsync(string id)
        {
            if(string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            return await _context.ReadAsync(id, id);  
        }
        
        // create blog
        public async Task<Blog> CreateAsync(Blog blog)
        {
            return await _context.CreateAsync(blog, blog.Partition);
        } 
        
        // publish blog
        public async Task<Blog> PublishAsync(string id)
        {
            var blog = await this.GetBlogAsync(id);

            if (!blog.Published)
            {
                blog.Published = true;
                blog.UpdatedOn = DateTimeOffset.Now;
                await this.UpdateAsyncc(blog);
            }

            return blog;
        }

        // update a blog 
        public async Task<Blog> UpdateAsyncc(Blog blog)
        {
            return await _context.UpsertAsync(blog, blog.Partition);
        }

        // delete a blog
        public async Task DeleteAsync(string id)
        {
            await _context.DeleteAsync(id, id);
        }

    }
}
