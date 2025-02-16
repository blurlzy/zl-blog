namespace ZLBlog.Persistence.Storage
{
    public class BlobService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly string _containerName;
        private readonly BlobContainerClient _containerClient;

        // metadata key
        private readonly string _authorKey = "author";
        
        public BlobService(BlobServiceClient blobServiceClient, string containerName)
        {
            _blobServiceClient = blobServiceClient;
            _containerName = containerName;
            _containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        }

        /// <summary>
        /// Returns the URIs for the most recently modified blobs (images) in the container.
        /// </summary>
        /// <param name="count">Number of images to return, e.g., 20 or 30.</param>
        /// <returns>A list of blob URIs, sorted by last modified descending.</returns>
        public async Task<IEnumerable<BlobItem>> GetLatestImagesAsync(int count = 20)
        {

            // We will collect BlobItems in memory, then sort them by last modified
            var blobItems = new List<BlobItem>();

            // List all blobs in the container (flat listing)
            await foreach (var blob in _containerClient.GetBlobsAsync())
            {
                // You might want to filter by blob type or extension if only some are images
                // For example:
                // if (!IsImageFile(blob.Name)) continue;

                blobItems.Add(blob);
            }

            // Sort by last-modified descending, then take the top "count"
#pragma warning disable CS8629 // Nullable value type may be null.
            var latestBlobs = blobItems
                .Where(b => b.Properties.LastModified.HasValue)
                .OrderByDescending(b => b.Properties.LastModified.Value)
                .Take(count);
#pragma warning restore CS8629 // Nullable value type may be null.

            return latestBlobs;
        }

        public async Task<IEnumerable<BlobItem>> GetLatestImagesAsync(string userId, int count = 20)
        {
            // We need metadata in the listing, so we request BlobTraits.Metadata
            var blobList = _containerClient.GetBlobsAsync(traits: BlobTraits.Metadata);

            // We will collect BlobItems in memory, then sort them by last modified
            var blobItems = new List<BlobItem>();

            // List all blobs in the container (flat listing)
            await foreach (var blob in blobList)
            {
                // You might want to filter by blob type or extension if only some are images
                // For example:
                // if (!IsImageFile(blob.Name)) continue;

                // Check if the "author" metadata is present 
                if (blob.Metadata.TryGetValue(_authorKey, out var value) && value == userId)
                {
                    blobItems.Add(blob);
                }

            }

            // Sort by last-modified descending, then take the top "count"
#pragma warning disable CS8629 // Nullable value type may be null.
            var latestBlobs = blobItems
                .Where(b => b.Properties.LastModified.HasValue)
                .OrderByDescending(b => b.Properties.LastModified.Value)
                .Take(count);
#pragma warning restore CS8629 // Nullable value type may be null.

            return latestBlobs;
        }


        // return blob uri
        public string GetBlobUri(BlobItem item)
        {

            // Get a reference to the blob
            BlobClient blobClient = _containerClient.GetBlobClient(item.Name);
            return blobClient.Uri.ToString();
        }

        // upload a file blob including meta data
        public async Task<Uri> UploadImageAsync(Stream stream, string fileName, Dictionary<string, string>? metadata = null)
        {
            // blob client
            var blobClient = _containerClient.GetBlobClient(fileName);
            // blob metadata
            BlobUploadOptions options = new BlobUploadOptions
            {
                Metadata = (metadata == null || metadata.Count == 0) ? new Dictionary<string, string>() : metadata
            };
            await blobClient.UploadAsync(stream, options);
            return blobClient.Uri;
        }

        // upload a file blob via Stream
        public async Task<Uri> UploadImageAsync(Stream stream, string fileName)
        {
            // blob client
            var blobClient = _containerClient.GetBlobClient(fileName);

            // upload
            await blobClient.UploadAsync(stream, true);

            return blobClient.Uri;
        }

        /// <summary>
        /// Optional helper if you want to filter by extension. 
        /// For instance, .png, .jpg, .jpeg, .gif, etc.
        /// </summary>
        private bool IsImageFile(string blobName)
        {
            var allowedExtensions = new[] { ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp" };
            var ext = System.IO.Path.GetExtension(blobName).ToLowerInvariant();
            return allowedExtensions.Contains(ext);
        }
    }
}
