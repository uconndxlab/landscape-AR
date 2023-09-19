namespace landscape_architecture.WebAPI.DTO
{
    public class FileUploadDTO
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}
