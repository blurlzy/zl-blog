
using Xunit.Abstractions;
using ZLBlog.Config;
using ZLBlog.Models;
using ZLBlog.Persistence;

namespace ZLBlog.Tests.Tests
{
    public class Persistence_Tests
    {
        // cosmos settings
        private readonly string _cosmosConnection = SecretManager.GetSecret(SecretKeys.CosmosConnection);
        private readonly string _cosmosDb = SecretManager.GetSecret(SecretKeys.CosmosDb);
        private readonly string _blogContainer = SecretManager.GetSecret(SecretKeys.BlogContainer);

        private readonly CosmosDbBlogContext _context;
        private readonly BlogRepository _blogRepository;

        private readonly ITestOutputHelper _output;

        // ctor
        public Persistence_Tests(ITestOutputHelper output)
        {
            // cosmos db context
            _context = new CosmosDbBlogContext(_cosmosConnection, _cosmosDb, _blogContainer);

            // repo
            _blogRepository = new BlogRepository(_context);

            _output = output;
        }

        [Theory]
        //[InlineData("", 0, 12, true)]
        [InlineData("second", 0, 12, false, true)]
        public async Task Search_Blogs_Test(string keyword, int skip, int count, bool publishedOnly, bool includeDeletedItems)
        {
           var pagedList = await _blogRepository.SearcchBlogsAsync(keyword, skip, count, publishedOnly, includeDeletedItems);

            Assert.True(pagedList.Total >= 0);
        }

        [Theory]
        [InlineData("My first blog", "jil", "<main class=\"container my-5\"><router-outlet></router-outlet></main>")]
        public async Task Create_Blog_Test(string title, string userId, string content)
        {
            var newBlog = new Blog(title, content, Array.Empty<string>(), userId, userId);

            await _blogRepository.CreateAsync(newBlog);
        }

        [Theory]
        [InlineData("d9a7f839-a543-416d-94ec-98f7a01532a6")]
        public async Task Delete_Blog_Test(string id)
        {
            await _blogRepository.DeleteAsync(id);
        }
    }
}
