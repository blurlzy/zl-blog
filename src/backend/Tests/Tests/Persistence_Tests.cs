
using Azure.Core.Pipeline;
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
        private readonly string _blogCommentContainer = SecretManager.GetSecret(SecretKeys.BlogCommentContainer);

        private readonly CosmosDbBlogContext _context;
        private readonly CosmosDbBlogCommentContext _commentContext;
        
        private readonly BlogRepository _blogRepository;
        private readonly BlogCommentRepository _blogCommentRepository;

        private readonly ITestOutputHelper _output;

        // ctor
        public Persistence_Tests(ITestOutputHelper output)
        {
            // cosmos db context
            _context = new CosmosDbBlogContext(_cosmosConnection, _cosmosDb, _blogContainer);
            _commentContext = new CosmosDbBlogCommentContext(_cosmosConnection, _cosmosDb, _blogCommentContainer);

            // repo
            _blogRepository = new BlogRepository(_context);
            _blogCommentRepository = new BlogCommentRepository(_commentContext);

            _output = output;
        }

        [Theory]
        [InlineData("second", 0, 12, false, true)]
        public async Task Search_Blogs_Test(string keyword, int skip, int count, bool publishedOnly, bool includeDeletedItems)
        {
           var pagedList = await _blogRepository.SearcchBlogsAsync(keyword, skip, count, publishedOnly, includeDeletedItems);

            Assert.True(pagedList.Total >= 0);
        }

        [Theory]
        [InlineData("Azure", 0, 12, false, true)]
        [InlineData("About", 0, 12, false, true)]
        [InlineData("Test", 0, 12, false, true)]
        public async Task Flter_Blogs_Test(string tag, int skip, int count, bool publishedOnly, bool includeDeletedItems)
        {
            var pagedList = await _blogRepository.FilterBlogsAsync(tag, skip, count, publishedOnly, includeDeletedItems);

            _output.WriteLine($"Total results: {pagedList.Total}");
        }

        [Theory]
        [InlineData("My first blog", "jil", "<main class=\"container my-5\"><router-outlet></router-outlet></main>")]
        public async Task Create_Blog_Test(string title, string userId, string content)
        {
            var newBlog = new Blog(title, content, Array.Empty<string>(), userId, userId);

            await _blogRepository.CreateAsync(newBlog);
        }

        [Theory]
        [InlineData("02065035-d21a-4b96-9b7d-f9ccf6aca217")]
        [InlineData("13d7206f-ed8c-46c9-a1e7-401db3749a40")]
        [InlineData("6c9ea86d-5925-4753-a6ef-c34c9203f292")]
        public async Task Delete_Blog_Test(string id)
        {
            await _blogRepository.DeleteAsync(id);
        }

        [Theory]
        [InlineData("e39a5df3-0258-43b1-9c45-d5005b9a0824")]
        public async Task List_Comments_Test(string blogId)
        {
            var comments = await _blogCommentRepository.GetCommentsAsync(blogId);

            Assert.NotNull(comments);
        }

        [Theory]
        [InlineData("e39a5df3-0258-43b1-9c45-d5005b9a0824", "Justin Li", "Hello world!")]
        public async Task Create_Comment_Test(string blogId, string name, string commentText)
        {
            var blogComment = new BlogComment(blogId, commentText, name, name);

            await _blogCommentRepository.CreateAsync(blogComment);
        }
    }
}
