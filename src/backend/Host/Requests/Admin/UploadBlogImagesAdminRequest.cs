
namespace ZLBlog.Requests
{
    public record UploadBlogImagesAdminRequest: IRequest<Unit>
    {
        public List<FileUploadDto> Files { get; init; }
        public string UserId { get; init; }
        public string UserEmail { get; init; }
    }

    public class UploadBlogImageHandler : IRequestHandler<UploadBlogImagesAdminRequest, Unit>
    {
        private readonly BlobService _blobService;

        // ctor
        public UploadBlogImageHandler(BlobService blobService)
        {
            _blobService = blobService; 

        }

        public async Task<Unit> Handle(UploadBlogImagesAdminRequest request, CancellationToken cancellationToken)
        {
            // ensure each content item has at least one image fiel
            if (request.Files == null || !request.Files.Any())
            {
                throw new Exception("At least one file / image is required.");
            }

            // blob meta data
            Dictionary<string, string> metadata = new Dictionary<string, string>
            {
                { "author", request.UserId },
                { "authorEmail", request.UserEmail}
            };

            // upload files
            foreach (var file in request.Files)
            {
                if (!FileValidator.IsImage(file.FileExtension))
                {
                    continue;
                }

                // generate unique file name
                var fileName = Guid.NewGuid().ToString() + file.FileExtension;
                // upload file
                await _blobService.UploadImageAsync(file.FileStream, fileName, metadata);
            }

            return Unit.Value;
        }
    }
}
