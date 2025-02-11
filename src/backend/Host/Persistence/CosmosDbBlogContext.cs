using ZLBlog.Models;

namespace ZLBlog.Persistence
{
    public class CosmosDbBlogContext: CosmosDbContext<Blog>
    {
        // ctor
        public CosmosDbBlogContext(string connectionString, string database, string container): base(connectionString, database, container) 
        {
                
        }

        public Task<IEnumerable<Blog>> QueryEntitiesAsync(int skip, int count)
        {
            return Task.Run<IEnumerable<Blog>>(
                    () => this._container.GetItemLinqQueryable<Blog>(true)
                                         .OrderByDescending(m => m.CreatedOn).Skip(skip).Take(count).AsEnumerable());
        }

        public Task<IEnumerable<Blog>> QueryEntitiesAsync(Func<Blog, bool> predicate, int skip, int count)
        {
            return Task.Run<IEnumerable<Blog>>(
                    () => this._container.GetItemLinqQueryable<Blog>(true)
                            .Where(predicate).OrderByDescending(m => m.CreatedOn).Skip(skip).Take(count).AsEnumerable());
        }
    }
}
