namespace ZLBlog.Models.Dtos
{
    public class FileUploadDto
    {
        public string FileExtension { get; set; }

        public Stream FileStream { get; set; }
    }
}
