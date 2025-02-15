using Microsoft.Azure.Cosmos;
using System.Linq.Expressions;

namespace ZLBlog.Persistence
{
    public class CosmosDbBlogCommentContext: CosmosDbContext<BlogComment>
    {
        // ctor
        public CosmosDbBlogCommentContext(string connectionString, string database, string container) : base(connectionString, database, container)
        {
            
        }

        public Task<IEnumerable<BlogComment>> ListCommentsAsync(string blogId)
        {
            return Task.Run<IEnumerable<BlogComment>>(
                    () => base._container.GetItemLinqQueryable<BlogComment>(true)
                            .Where(m => m.BlogId == blogId).OrderByDescending(m => m.CreatedOn)
                            .AsEnumerable());
        }
    }
}
