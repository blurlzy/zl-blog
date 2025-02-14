
namespace ZLBlog.Requests
{
    public class UploadBlogImagesRequest: IRequest<Unit>
    {
        public List<FileUploadDto> Files { get; set; }
    }

    public class UploadBlogImageHandler : IRequestHandler<UploadBlogImagesRequest, Unit>
    {
        private readonly BlobService _blobService;

        // ctor
        public UploadBlogImageHandler(BlobService blobService)
        {
            _blobService = blobService; 

        }

        public async Task<Unit> Handle(UploadBlogImagesRequest request, CancellationToken cancellationToken)
        {
            // ensure each content item has at least one image fiel
            if (request.Files == null || !request.Files.Any())
            {
                throw new Exception("At least one file / image is required.");
            }

            // upload files
            foreach (var file in request.Files)
            {
                // generate unique file name
                var fileName = Guid.NewGuid().ToString() + file.FileExtension;
                // upload file
                var blobUri = await _blobService.UploadImageAsync(file.FileStream, fileName);
            }

            return Unit.Value;
        }
    }
}
