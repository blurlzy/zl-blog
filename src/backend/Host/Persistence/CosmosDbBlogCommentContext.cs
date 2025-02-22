using Microsoft.Azure.Cosmos;


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

        public async Task<PagedList<BlogComment>> ListCommentsAysnc(int pageIndex, int pageSize)
        {
            // query items
            var query = @"SELECT * FROM c ORDER BY c.createdOn DESC OFFSET @skip LIMIT @take";

            QueryDefinition queryDef = new QueryDefinition(query)
                                               .WithParameter("@skip", pageIndex * pageSize)
                                               .WithParameter("@take", pageSize);

            var pagedList = await base.RunQueryAsync(queryDef);

            // count total items
            var countQuery = @"SELECT VALUE COUNT(1) FROM c  ";

            QueryDefinition countQueryDef = new QueryDefinition(countQuery);
            var totalCount = await base.CountAsync(countQueryDef);

            return new PagedList<BlogComment>(totalCount, pagedList);
        }
    }
}
