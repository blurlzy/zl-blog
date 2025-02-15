namespace ZLBlog.Models
{
    public class BlogComment
    {
        public string Id { get; set; }

        // partition key
        public string BlogId { get; set; }

        [JsonIgnore]
        public string Partition => this.BlogId;

        public string CommentText { get; set; }

        public string UserId { get; set; }

        public string Name { get; set; }

        /// <summary>
        /// Timestamp of the chat creation.
        /// </summary>
        public DateTimeOffset CreatedOn { get; set; }

        public DateTimeOffset? UpdatedOn { get; set; }

        public BlogComment(string blogId, string commentText, string userId,string name)
        {
            this.Id = Guid.NewGuid().ToString();
            this.BlogId = blogId;
            this.CommentText = commentText;
            this.UserId = userId;
            this.Name = name;
            this.CreatedOn = DateTimeOffset.Now;
        }

    }
}
