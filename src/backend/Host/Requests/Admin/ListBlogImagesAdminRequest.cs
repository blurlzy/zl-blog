
namespace ZLBlog.Requests
{
    public record ListBlogImagesAdminRequest: IRequest<IEnumerable<BlobDto>>
    {
        public int Top { get; init; }
    }

    public class ListBlobImagesAdminHandler : IRequestHandler<ListBlogImagesAdminRequest, IEnumerable<BlobDto>>
    {
        private readonly BlobService _blobService;

        // ctor
        public ListBlobImagesAdminHandler(BlobService blobService)
        {
                _blobService = blobService;
        }

        public async Task<IEnumerable<BlobDto>> Handle(ListBlogImagesAdminRequest request, CancellationToken cancellationToken)
        {
            // get the latest image blobs
            var latestBlobs = await _blobService.GetLatestImagesAsync(request.Top);

            var resultSet = new List<BlobDto>();

            foreach (var blob in latestBlobs)
            {
                var blobUri = _blobService.GetBlobUri(blob);

                resultSet.Add(new BlobDto { Name = blob.Name, Uri = blobUri });
            }

            return resultSet;
        }
    }
}
