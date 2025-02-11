using System.Reflection.Metadata;
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
        [InlineData(0, 12)]
        public async Task List_Blogs_Test(int skip, int count)
        {
            var blogs = await _blogRepository.ListBlogsAsync(skip, count);

            var firstBlog = blogs.FirstOrDefault();

            // show content
            var content = firstBlog?.Content;

            _output.WriteLine(content ?? "no content"); 
        }

        [Theory]
        [InlineData("My first blog", "jil", "<main class=\"container my-5\"><router-outlet></router-outlet></main>")]
        public async Task Create_Blog_Test(string title, string userId, string content)
        {
            var newBlog = new Blog(title, content, userId, userId);

            await _blogRepository.CreateAsync(newBlog);
        }
    }
}
