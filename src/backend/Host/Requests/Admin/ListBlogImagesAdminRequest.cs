
namespace ZLBlog.Requests
{
    public record ListBlogImagesAdminRequest: IRequest<PagedList<BlobDto>>
    {
        public string UserId { get; init; }
        public int PageIndex { get; init; }
        public int PageSize { get; init; }
    }

    public class ListBlogImagesAdminHandler : IRequestHandler<ListBlogImagesAdminRequest, PagedList<BlobDto>>
    {
        private readonly BlobService _blobService;

        // ctor
        public ListBlogImagesAdminHandler(BlobService blobService)
        {
                _blobService = blobService;
        }

        public async Task<PagedList<BlobDto>> Handle(ListBlogImagesAdminRequest request, CancellationToken cancellationToken)
        {
            // get the blobs
            var resultset = await _blobService.GetImagesAsync(request.UserId, request.PageIndex, request.PageSize);

            var data = new List<BlobDto>(); 

            foreach (var blob in resultset.Data)
            {

                // get the blob uri
                var blobUri = _blobService.GetBlobUri(blob);
                data.Add(new BlobDto { Name = blob.Name, Uri = blobUri, CreatedOn = blob.Properties.CreatedOn, Tag = blob.Properties.ETag.ToString() });
            }

            return new PagedList<BlobDto>(resultset.Total, data);
        }
    }
}
