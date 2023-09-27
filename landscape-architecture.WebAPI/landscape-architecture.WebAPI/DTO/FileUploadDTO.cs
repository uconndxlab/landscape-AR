namespace landscape_architecture.WebAPI.DTO
{
    public class FileUploadDTO
    {
        public required string FileName { get; set; }
        public required IFormFile FormFile { get; set; }
    }
}
