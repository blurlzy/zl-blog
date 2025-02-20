namespace ZLBlog.Models.Dtos
{
    public class BlobDto
    {
        public string? Tag { get; set; }
        public string Name { get; set; }
        public string Uri { get; set; }
        public DateTimeOffset? CreatedOn { get; set; }
    }
}
