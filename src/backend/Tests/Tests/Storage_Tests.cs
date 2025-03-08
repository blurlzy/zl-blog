using Azure.Storage.Blobs;
using Xunit.Abstractions;
using ZLBlog.Config;
using ZLBlog.Models;
using ZLBlog.Persistence;
using ZLBlog.Persistence.Storage;


namespace ZLBlog.Tests.Tests
{
    public class Storage_Tests
    {
        // storage account connection
        private readonly string _stConnection = SecretManager.GetSecret(SecretKeys.StorageAccConnection);
        private readonly string _blogImgContainer = "blog-images";

        private readonly BlobServiceClient _blobServiceClient;
        private readonly BlobService _blobService;

        private readonly ITestOutputHelper _output;

        // ctor
        public Storage_Tests(ITestOutputHelper output)
        {
            _blobServiceClient = new BlobServiceClient(_stConnection);
            _blobService = new BlobService(_blobServiceClient, _blogImgContainer);

            _output = output;
        }

        [Theory]
        [InlineData(30)]
        public async Task Get_Latest_Images_Test(int top)
        {
            var blobs = await _blobService.GetLatestImagesAsync(top);

            foreach (var blob in blobs)
            {
                _output.WriteLine($"File name: {blob.Name}");
                var blobUri = _blobService.GetBlobUri(blob);
                _output.WriteLine($"Uri: {blobUri}");
            }
        }

    }
}
