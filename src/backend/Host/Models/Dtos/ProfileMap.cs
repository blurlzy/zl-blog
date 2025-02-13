using AutoMapper;

namespace ZLBlog.Models.Dtos
{
    public class BlogProfileMap: Profile
    {
        public BlogProfileMap()
        {
            CreateMap<Blog, SimpleBlogDto>();
        }
    }
}
