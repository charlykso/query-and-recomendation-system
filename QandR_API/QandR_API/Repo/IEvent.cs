using QandR_API.DTO;
using QandR_API.Models;

namespace QandR_API.Repo
{
    public interface IEvent
    {
        public Task<IEnumerable<Event>> GetEvents();
        public Task<Event> GetEvent(string id);
        public Task<string> UpdateEvent(string id, Event_DTO editEvent);
        public Task<string> DeleteEvent(string id);
        public Task<string> CreateEvent(Event_DTO newEvent);
        public Task<IEnumerable<Event>> getAllQuery();
        public Task<IEnumerable<Event>> getLecturerQueries(string id);
        public Task<IEnumerable<Event>> getStudentQueries(string id);
        public Task<IEnumerable<Event>> getAllRecomendation();
        public Task<IEnumerable<Event>> getLecturerRecomendations(string id);
        public Task<IEnumerable<Event>> getStudentRecomendations(string id);
    }
}

