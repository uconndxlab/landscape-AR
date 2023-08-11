namespace landscape_architecture.WebAPI.DTO
{
    public class TopoDTO
    {
        public int XSize { get; set; }
        public int YSize { get; set; }
        public int[][]? Grid { get; set; } 
    }
}
