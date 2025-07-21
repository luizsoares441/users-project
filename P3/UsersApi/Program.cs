using Microsoft.EntityFrameworkCore;
using UsersApi.Data;
using UsersApi.Data.Repositories;
using UsersApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
         {
             options.AddPolicy("AllowAll",
                 builder =>
                 {
                     builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                 });
         });

builder.Services.AddDbContext<AppDbContext>(op =>
{
    op.UseInMemoryDatabase("UsersDb");
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
