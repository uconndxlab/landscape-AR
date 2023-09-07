using landscape_architecture.WebAPI;
using landscape_architecture.WebAPI.Services;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IObjectToTopoServiceFacade, ObjectToTopoServiceFacade>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddDbContext<LandscapeContext>();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddSwaggerGen();
// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
// Configure forwarded headers
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.KnownProxies.Add(IPAddress.Parse("157.230.214.250"));
});

var dbConnectionString = builder.Configuration["ConnectionStrings:landscape"];


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
