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

        public Task<IEnumerable<Blog>> QueryEntitiesAsync(Expression<Func<Blog, bool>> predicate, int skip, int count)
        {
            return Task.Run<IEnumerable<Blog>>(
                    () => base._container.GetItemLinqQueryable<Blog>(true)
                            .Where(predicate).OrderByDescending(m => m.CreatedOn).Skip(skip).Take(count).AsEnumerable());
        }

        public async Task<PagedList<Blog>> ListBlogsAsync(int pageIndex, int pageSize, bool publishedOnly, bool includeDeletedItems)
        {
            // query items
            var query = @"SELECT * FROM c ";

            if (!includeDeletedItems)
            {
                query += "WHERE c.isDeleted = false ";
            }

            if (publishedOnly)
            {
                query += !includeDeletedItems ? " AND c.published = true " : " WHERE c.published = true ";
            }

            query += " ORDER BY c.createdOn DESC OFFSET @skip LIMIT @take";

            QueryDefinition queryDef = new QueryDefinition(query)
               .WithParameter("@skip", pageIndex * pageSize)
               .WithParameter("@take", pageSize);

            var pagedList = await base.RunQueryAsync(queryDef);
            
            // count total items
            var countQuery = @"SELECT VALUE COUNT(1) FROM c  ";

            if (!includeDeletedItems)
            {
                countQuery += "WHERE c.isDeleted = false ";
            }

            if (publishedOnly)
            {
                countQuery += !includeDeletedItems ? " AND c.published = true " : " WHERE c.published = true ";
            }

            QueryDefinition countQueryDef = new QueryDefinition(countQuery);
            var totalCount = await base.CountAsync(countQueryDef);

            return new PagedList<Blog>(totalCount, pagedList);
        }

        public async Task<PagedList<Blog>> SearchBlogsAsync(string keyword, int pageIndex, int pageSize, bool publishedOnly, bool includeDeletedItems)
        {
            // search items by keyword
            var searchQuery = @"SELECT * FROM c
                            WHERE (CONTAINS(LOWER(c.title), LOWER(@keyword)) OR CONTAINS(LOWER(c.content), LOWER(@keyword))) ";
            
            if(!includeDeletedItems)
            {
                searchQuery += "AND (c.isDeleted = false) ";
            }

            if(publishedOnly)
            {
                searchQuery += "AND (c.published = true) ";
            }

            searchQuery += " ORDER BY c.createdOn DESC OFFSET @skip LIMIT @take";


            QueryDefinition query = new QueryDefinition(searchQuery)
                           .WithParameter("@keyword", keyword)
                           .WithParameter("@skip", pageIndex * pageSize)
                           .WithParameter("@take", pageSize);

            var pagedList = await base.RunQueryAsync(query);

            // count items
            var countQuery = @"SELECT VALUE COUNT(1) FROM c 
                                WHERE (CONTAINS(LOWER(c.title), LOWER(@keyword)) OR CONTAINS(LOWER(c.content), LOWER(@keyword))) ";


            if (!includeDeletedItems)
            {
                countQuery += "AND (c.isDeleted = false) ";
            }

            if (publishedOnly)
            {
                countQuery += "AND (c.published = true) ";
            }

            QueryDefinition count = new QueryDefinition(countQuery)
                      .WithParameter("@keyword", keyword);

            var totalCount = await base.CountAsync(count);

            return new PagedList<Blog>(totalCount, pagedList);
        }

    }
}
