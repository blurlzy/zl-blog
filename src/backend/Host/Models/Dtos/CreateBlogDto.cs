namespace ZLBlog.Models.Dtos
{
    public record UpsetBlogDto
    {
        public string? Id { get; init; }
        public string Title { get; init; }
        public string Content { get; init; }
        public string Tags { get; init; }
    }

}
