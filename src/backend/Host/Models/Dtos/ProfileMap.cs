
namespace ZLBlog.Models.Dtos
{
    public class BlogProfileMap: Profile
    {
        public BlogProfileMap()
        {
            // map model
            CreateMap<Blog, SimpleBlogDto>().ForMember(dest => dest.IsArchived, opt => opt.MapFrom(s => s.IsDeleted));
        }
    }
}
