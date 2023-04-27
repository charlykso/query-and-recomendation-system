using Microsoft.EntityFrameworkCore;
using QandR_API.DTO;
using QandR_API.Models;
using QandR_API.Repo;
using AutoMapper;

namespace QandR_API.Services
{
    public class EventServices : IEvent
    {
        private readonly QandR_DBContext? _dbContext;
        private readonly IMapper _imapper;
        public EventServices(QandR_DBContext? dbContext, IMapper imapper)
        {
            _dbContext = dbContext;
            _imapper = imapper;
        }

        public async Task<string> CreateEvent(Event_DTO newEvent)
        {
            try
            {
                var myEvent = _imapper.Map<Event>(newEvent);
                var Id = Guid.NewGuid();
                myEvent.Id = Id.ToString();
                myEvent.Created_at = DateTime.Now;
                myEvent.Update_at = DateTime.Now;

                var eve = await _dbContext!.AddAsync(myEvent);
                if (eve == null)
                {
                    throw new Exception("Something went wrong");
                }

                await _dbContext.SaveChangesAsync();
                return "Event created";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public async Task<string> DeleteEvent(string id)
        {
            try
            {
                var myEvent = await _dbContext!.Events.FindAsync(id);
                if (myEvent == null)
                {
                    throw new Exception("Event not found");
                }
                _dbContext!.Remove(myEvent);
                _dbContext.SaveChanges();
                return "Deleted successfuly";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public async Task<IEnumerable<Event>> getAllQuery()
        {
            try
            {
                var queries = await _dbContext!.Events.Where(e => e.Type == "Query")
                    .Include(l => l.Lecturer)
                    .Include(s => s.Student)
                    .ToListAsync();
                if (queries.Count == 0)
                {
                    return null!;
                }
                return queries;
            }
            catch (Exception)
            {

                return null!;
            }
        }

        public async Task<IEnumerable<Event>> getAllRecomendation()
        {
            try
            {
                var recomendation = await _dbContext!.Events.Where(e => e.Type == "Recommendation")
                    .Include(l => l.Lecturer)
                    .Include(s => s.Student)
                    .ToListAsync();
                if (recomendation.Count == 0)
                {
                    return null!;
                }
                return recomendation;
            }
            catch (Exception)
            {

                return null!;
            }
        }

        public async Task<Event> GetEvent(string id)
        {
            try
            {
                var eve = await _dbContext!.Events.Where(e => e.Id == id)
                    .Include(l => l.Lecturer)
                    .Include(s => s.Student)
                    .FirstOrDefaultAsync();
                if (eve == null)
                {
                    return null!;
                }
                return eve;
            }
            catch (Exception)
            {

                return null!;
            }
        }

        public async Task<IEnumerable<Event>> GetEvents()
        {
            try
            {
                var eves = await _dbContext!.Events.OrderBy(e => e.Created_at)
                    .Include(l => l.Lecturer)
                    .Include(s => s.Student)
                    .ToListAsync();
                if (eves.Count == 0)
                {
                    return null!;
                }
                return eves;
            }
            catch (Exception)
            {

                return null!;
            }
        }

        public async Task<IEnumerable<Event>> getLecturerQueries(string id)
        {
            try
            {
                var queries = await _dbContext!.Events.Where(e => e.Type == "Query" && e.LecturerId == id)
                    .ToListAsync();
                if (queries == null)
                {
                    return null!;
                }
                return queries;
            }
            catch (Exception)
            {

                return null!;
            }
        }

        public async Task<IEnumerable<Event>> getLecturerRecomendations(string id)
        {
            try
            {
                var recom = await _dbContext!.Events.Where(e => e.Type == "Recommendation" && e.LecturerId == id)
                    .ToListAsync();
                if (recom.Count == 0)
                {
                    return null!;
                }
                return recom;
            }
            catch (Exception)
            {

                return null!;
            }
        }

        public async Task<IEnumerable<Event>> getStudentQueries(string id)
        {
            try
            {
                var queries = await _dbContext!.Events.Where(e => e.Type == "Query" && e.StudentId == id)
                    .Include(l => l.Lecturer)
                    .ToListAsync();
                if (queries.Count == 0)
                {
                    return null!;
                }
                return queries;
            }
            catch (Exception)
            {

                return null!;
            }
        }

        public async Task<IEnumerable<Event>> getStudentRecomendations(string id)
        {
            try
            {
                var recom = await _dbContext!.Events.Where(e => e.StudentId == id && e.Type == "Recommendation")
                    .Include(l => l.Lecturer)
                    .ToListAsync();
                if (recom.Count == 0)
                {
                    return null!;
                }
                return recom;
            }
            catch (Exception)
            {

                return null!;
            }
        }

        public async Task<string> UpdateEvent(string id, Event_DTO editEvent)
        {
            try
            {
                var myEvent = await _dbContext!.Events.FindAsync(id);
                if (myEvent == null)
                {
                    return "Event not found";
                }
                myEvent.StudentId = editEvent.StudentId;
                myEvent.LecturerId = editEvent.LecturerId;
                myEvent.Course_code = editEvent.Course_code;
                myEvent.Description = editEvent.Description;
                myEvent.Type = editEvent.Type;
                myEvent.Update_at = DateTime.Now;

                var eve = await _dbContext!.AddAsync(myEvent);
                if (eve == null)
                {
                    return ("Event not created");
                }

                _dbContext!.Events.Attach(myEvent);
                _dbContext.SaveChanges();
                return "Event updated";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }
    }
}
