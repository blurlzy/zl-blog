
using Azure.Storage.Blobs;
using Newtonsoft.Json;
using System.Text;
using Xunit.Abstractions;
using ZLBlog.Config;
using ZLBlog.Persistence;

namespace ZLBlog.Tests.Tests
{
    public class Util_Tests
    {
        // cosmos settings
        private readonly string _cosmosConnection = SecretManager.GetSecret(SecretKeys.CosmosConnection);
        private readonly string _cosmosDb = SecretManager.GetSecret(SecretKeys.CosmosDb);
        private readonly string _container = SecretManager.GetSecret(SecretKeys.BlogContainer);

        private readonly CosmosDbBlogContext _context;

        // storage
        private readonly string _stConnection = "<st-conn>";
        private readonly string _blogBackupContainer = "<container-name>";

        private readonly BlobServiceClient _blobServiceClient;

        private readonly ITestOutputHelper _output;

        // ctor
        public Util_Tests(ITestOutputHelper output)
        {
            // cosmos db context
            _context = new CosmosDbBlogContext(_cosmosConnection, _cosmosDb, _container);

            // blob client
            _blobServiceClient = new BlobServiceClient(_stConnection);

            _output = output;
        }

        [Fact]
        public async Task Copy_CosmosItems_Storage()
        {
            // get all the data in cosmos
            var data = await _context.ListItemsAsync(m => m.IsDeleted == false);

            var containerClient = _blobServiceClient.GetBlobContainerClient(_blogBackupContainer);

            // 
            foreach (var item in data)
            {
                string docJson = JsonConvert.SerializeObject(item, Formatting.Indented);

                // blob file name
                string fileName = $"{item.Id}.json";

                // Convert to stream
                byte[] byteArray = Encoding.UTF8.GetBytes(docJson);
                using var ms = new MemoryStream(byteArray);

                // Get BlobClient with your filename
                var blobClient = containerClient.GetBlobClient(fileName);

                _output.WriteLine($"Uploading document: {fileName}");
                // Upload (or overwrite if needed)
                await blobClient.UploadAsync(ms, overwrite: true);
            }
        }
    }
}
