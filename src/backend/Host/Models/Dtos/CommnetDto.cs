namespace ZLBlog.Models.Dtos
{
    public record CommnetDto
    {
        public string BlogId { get; set; }
        public string CommentText { get; set; }
        public string By { get; set; }
    }
}
