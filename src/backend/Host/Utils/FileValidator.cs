namespace ZLBlog.Utils
{
    public static class FileValidator
    {
        // A set of allowed image extensions (case-insensitive).
        private static readonly HashSet<string> AllowedExtensions = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            ".png", ".jpg", ".jpeg", ".gif", ".jfif", ".webp", ".bmp", ".dpg", ".svg", ".tiff", ".tif", ".ico"
        };

        public static bool IsImage(IFormFile file)
        {
            var allowedMimeTypes = new[] { "image/jpeg", "image/png", "image/gif" };

            if (file == null || file.Length == 0) return false;
            return allowedMimeTypes.Contains(file.ContentType, StringComparer.OrdinalIgnoreCase);
        }

        /// <summary>
        /// Given a list of file paths, returns only those that appear to be images 
        /// based on their file extension.
        /// </summary>
        /// <param name="filePaths">A list of file paths or file names.</param>
        /// <returns>A list of valid image file paths.</returns>
        public static bool IsImage(string fileExtension)
        {
            return AllowedExtensions.Contains(fileExtension);
        }
    }
}
