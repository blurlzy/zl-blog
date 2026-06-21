
using System.Text.RegularExpressions;

namespace ZLBlog.Models
{
     public class Blog
     {
          /// <summary>
          /// blog Id that is persistent and unique.
          /// </summary>
          public string Id { get; set; }

          [JsonIgnore]
          public string Partition => this.Id;

          public string Title { get; set; }

          // blog content (html)
          public string Content { get; set; }

          // first paragraph of content (including any img elements)
          public string Preview => ExtractFirstParagraph(Content) ?? string.Empty;

          /// <summary>
          /// unique Id of the user who created this session. (azure object id)
          /// </summary>
          public string UserId { get; set; }

          /// <summary>
          /// Name of the user who created this message. (azure upn)
          /// </summary>
          public string UserName { get; set; }

          // tags 
          public string[] Tags { get; set; }

          /// <summary>
          /// Timestamp of the chat creation.
          /// </summary>
          public DateTimeOffset CreatedOn { get; set; }

          public DateTimeOffset? UpdatedOn { get; set; }

          public bool Published { get; set; }

          // soft delete
          public bool IsDeleted { get; set; }

          // popular post
          public bool? IsPopular { get; set; }

          // total comments
          public int? TotalComments { get; set; }

          private static string? ExtractFirstParagraph(string? html)
          {
               if (string.IsNullOrEmpty(html))
                    return null;

               var match = Regex.Match(html, @"<p[^>]*>.*?</p>", RegexOptions.Singleline | RegexOptions.IgnoreCase);
               return match.Success ? match.Value : null;
          }

          // ctor
          public Blog(string title, string content, string[] tags, string userId, string userName)
          {
               this.Id = Guid.NewGuid().ToString();
               this.Title = title;
               this.Content = content;
               this.Tags = tags;
               this.UserId = userId;
               this.UserName = userName;
               this.CreatedOn = DateTimeOffset.Now;
               this.Published = false;
               this.IsDeleted = false;
          }

     }
}
