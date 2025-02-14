namespace ZLBlog.Models.Dtos
{
    public record CreateBlogDto
    {
        public string Title { get; init; }
        public string Content { get; init; }
        public string Tags { get; init; }
    }

}
