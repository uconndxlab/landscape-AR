using System;
using System.Collections.Generic;
using landscape_architecture.WebAPI.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace landscape_architecture.WebAPI;

public partial class LandscapeContext : DbContext
{
    private readonly IConfiguration _configuration;
    public LandscapeContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public LandscapeContext(DbContextOptions<LandscapeContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Models.File> UploadedFiles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql(_configuration["ConnectionStrings:landscape"], Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.34-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
