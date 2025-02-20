
namespace ZLBlog.Requests
{
    public class ListLatestBlogImagesAdminRequest : IRequest<IEnumerable<BlobDto>>
    {
        public int Top { get; init; }
        public string UserId { get; init; }
    }

    public class ListLatestBlogImagesAdminHandler : IRequestHandler<ListLatestBlogImagesAdminRequest, IEnumerable<BlobDto>>
    {
        private readonly BlobService _blobService;

        // ctor
        public ListLatestBlogImagesAdminHandler(BlobService blobService)
        {
            _blobService = blobService;    
        }

        public async Task<IEnumerable<BlobDto>> Handle(ListLatestBlogImagesAdminRequest request, CancellationToken cancellationToken)
        {
            // get the latest image blobs
            var latestBlobs = await _blobService.GetLatestImagesAsync(request.UserId, request.Top);

            var resultSet = new List<BlobDto>();

            foreach (var blob in latestBlobs)
            {              
                var blobUri = _blobService.GetBlobUri(blob);

                resultSet.Add(new BlobDto { Name = blob.Name, Uri = blobUri, CreatedOn = blob.Properties.CreatedOn });
            }

            return resultSet;
        }
    }
}
