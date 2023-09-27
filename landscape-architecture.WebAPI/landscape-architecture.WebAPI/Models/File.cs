﻿namespace landscape_architecture.WebAPI.Models
{
    public class File
    {
        public int Id { get; set; }
        public required string FileName { get; set; }
        public required string FileExtension { get; set; }
        public required byte[] FileData { get; set; }
    }
}