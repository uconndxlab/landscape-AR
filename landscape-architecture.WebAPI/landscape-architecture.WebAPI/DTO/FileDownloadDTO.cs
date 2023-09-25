namespace landscape_architecture.WebAPI.DTO
{
    public class FileDownloadDTO
    {
        public required string FileName { get; set; }

        public required string FileType { get; set; }

        public required byte[] FileData { get; set; }

    }
}
