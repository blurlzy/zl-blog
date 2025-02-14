using ZLBlog.Persistence.Storage;

namespace ZLBlog.Persistence
{
    public static class Startup
    {
        public static void ConfigurePersistence(this IServiceCollection services, IConfiguration configuration)
        {
            // load cosmos configs
            var cosmosConn = configuration[SecretKeys.CosmosConnection];
            var cosmosDb = configuration[SecretKeys.CosmosDb];
            var cosmosBlogContainer = configuration[SecretKeys.BlogContainer];

            // init cosmos db context
#pragma warning disable CS8604 // Possible null reference argument.
            var blogDbContext = new CosmosDbBlogContext(cosmosConn, cosmosDb, cosmosBlogContainer);
#pragma warning restore CS8604 // Possible null reference argument.

            // register repo
            services.AddSingleton<BlogRepository>(m => new BlogRepository(blogDbContext));
        }

        public static void ConfigureBlobStorageService(this IServiceCollection services, IConfiguration configuration)
        {
            var storageConnection = configuration[SecretKeys.StorageAccConnection];

            // register azure blob client
            //services.AddSingleton(m => new BlobServiceClient(storageConnection));
            var blobServiceClient = new BlobServiceClient(storageConnection);

            // register blob repository
            services.AddSingleton(m => new BlobService(blobServiceClient, "blog-images"));
        }
    }
}
