using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using QandR_API.Models;
using QandR_API.Repo;
using QandR_API.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//for EF-core
builder.Services.AddDbContext<QandR_DBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("QandR_AppCon"));
});

//For JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });


//For Json Serializer
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());


builder.Services.AddScoped<IStudent, StudentServices>();
builder.Services.AddScoped<ILecturer, LecturerServices>();
builder.Services.AddScoped<ICourse, CourseServices>();
builder.Services.AddScoped<IEvent, EventServices>();
builder.Services.AddScoped<ILecturerCourse, LecturerCourseServices>();
builder.Services.AddScoped<ILogin, LoginServices>();

//For Automapper
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllersWithViews();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
