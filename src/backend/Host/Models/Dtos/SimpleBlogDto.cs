namespace ZLBlog.Models
{
    public class SimpleBlogDto
    {
        /// <summary>
        /// blog Id that is persistent and unique.
        /// </summary>
        public string Id { get; set; }

        public string Title { get; set; }

        public string[] Tags { get; set; }

        /// <summary>
        /// unique Id of the user who created this session. (azure object id)
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// Name of the user who created this message. (azure upn)
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Timestamp of the chat creation.
        /// </summary>
        public DateTimeOffset CreatedOn { get; set; }
        public DateTimeOffset? UpdatedOn { get; set; }
        public bool Published { get; set; }
        public bool IsArchived { get; set; }
    }
}
