namespace ZLBlog.Persistence.Storage
{
    public class BlobService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly string _containerName;
        private readonly BlobContainerClient _containerClient;

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
            // Get the container client
            // BlobContainerClient containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);


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
            var latestBlobs = blobItems
                .Where(b => b.Properties.LastModified.HasValue)
                .OrderByDescending(b => b.Properties.LastModified.Value)
                .Take(count);

            return latestBlobs;

            //// Build the public or direct-access URIs
            //// This will work only if the container is public or you have a SAS approach
            //var imageUris = new List<string>();

            //foreach (var blobItem in latestBlobs)
            //{
            //    // Get a reference to the blob
            //    BlobClient blobClient = containerClient.GetBlobClient(blobItem.Name);

            //    // If the container is public, you can just use blobClient.Uri
            //    // If not public, you'll need a SAS token or to retrieve a short-lived read URI
            //    imageUris.Add(blobClient.Uri.ToString());
            //}

            //return imageUris;
        }

        public string GetBlobUri(BlobItem item)
        {

            // Get a reference to the blob
            BlobClient blobClient = _containerClient.GetBlobClient(item.Name);
            return blobClient.Uri.ToString();
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
