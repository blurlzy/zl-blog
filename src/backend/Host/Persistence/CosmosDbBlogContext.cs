using Microsoft.Azure.Cosmos;
using System.Linq.Expressions;


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
                    () => base._container.GetItemLinqQueryable<Blog>(true)
                                         .OrderByDescending(m => m.CreatedOn).Skip(skip).Take(count).AsEnumerable());
        }

        public Task<IEnumerable<Blog>> QueryEntitiesAsync(Expression<Func<Blog, bool>> predicate, int skip, int count)
        {
            return Task.Run<IEnumerable<Blog>>(
                    () => base._container.GetItemLinqQueryable<Blog>(true)
                            .Where(predicate).OrderByDescending(m => m.CreatedOn).Skip(skip).Take(count).AsEnumerable());
        }

        public async Task<PagedList<Blog>> GetPagedList(int skip, int count)
        {
            // count query
            QueryDefinition countQuery = new QueryDefinition("SELECT VALUE COUNT(1) FROM c");

            var total = await base.CountAsync(countQuery);

            // list
            var blogs = await this.QueryEntitiesAsync(skip, count);

            return new PagedList<Blog>(total, blogs.ToList());
        }

    }
}
