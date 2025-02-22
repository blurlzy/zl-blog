using System.ComponentModel.DataAnnotations;

namespace ZLBlog.Models.Dtos
{
    public record CommnetDto
    {        
        public string BlogId { get; set; }
        
        [MaxLength(250)] // ensure the max length of a comment
        public string CommentText { get; set; }

        [MaxLength(50)] // ensure the max length of a user name
        public string By { get; set; }
    }
}
