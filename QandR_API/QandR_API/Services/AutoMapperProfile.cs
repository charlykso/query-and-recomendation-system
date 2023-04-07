using AutoMapper;
using QandR_API.DTO;
using QandR_API.Models;

namespace QandR_API.Services
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Student_DTO, Student>();
            CreateMap<Course_DTO, Course>();
            CreateMap<Lecturer_DTO, Lecturer>();
            CreateMap<Event_DTO, Event>();

            //For login
            CreateMap<Login_DTO, Token_DTO>();
            CreateMap<Lecturer, Login_DTO>();
            CreateMap<Student, Login_DTO>();
        }
    }
}
