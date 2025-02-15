namespace ZLBlog.Config
{
    public static class SecretKeys
    {
        // Cosmos keys
        public const string CosmosConnection = "CosmosConnection";
        public const string CosmosDb = "CosmosDb";
        public const string BlogContainer = "BlogContainer";
        public const string BlogCommentContainer = "BlogCommentContainer";

        // storage account - blog
        public const string StorageAccConnection = "StorageAccountConnection";

        // application insights
        public const string AppInsightsConnection = "AppInsightsConnection";

        // auth0
        public const string Auth0Domain = "Auth0Domain";
        public const string Auth0Audience = "Auth0Audience";
    }
}
