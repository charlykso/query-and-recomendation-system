using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QandR_API.DTO;
using QandR_API.Repo;
using System.Data;

namespace QandR_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEvent? _ievent;
        public EventController(IEvent ievent)
        {
                _ievent = ievent;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult> getEvents()
        {
            try
            {
                var events = await _ievent!.GetEvents();
                if (events == null)
                {
                    return NoContent();
                }
                return Ok(events);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/get")]
        public async Task<ActionResult> getEvent([FromRoute] string id)
        {
            try
            {
                var mainEvent = await _ievent!.GetEvent(id);
                if (mainEvent == null)
                {
                    return NotFound();
                }
                return Ok(mainEvent);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("queries/getAll")]
        public async Task<ActionResult> getQuery()
        {
            try
            {
                var queryEvent = await _ievent!.getAllQuery();
                if (queryEvent == null)
                {
                    return NoContent();
                }
                return Ok(queryEvent);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("lecturer/{Id}/queries")]
        public async Task<ActionResult> getLecturerQueries([FromRoute] string Id)
        {
            try
            {
                var queryEvent = await _ievent!.getLecturerQueries(Id);
                if (queryEvent == null)
                {
                    return NoContent();
                }
                return Ok(queryEvent);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("students/{Id}/queries")]
        public async Task<ActionResult> getStudentQueries([FromRoute] string Id)
        {
            try
            {
                var queryEvent = await _ievent!.getStudentQueries(Id);
                if (queryEvent == null)
                {
                    return NoContent();
                }
                return Ok(queryEvent);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("recomendation/getAll")]
        public async Task<ActionResult> getRecomendation()
        {
            try
            {
                var recomendEvent = await _ievent!.getAllRecomendation();
                if (recomendEvent == null)
                {
                    return NoContent();
                }
                return Ok(recomendEvent);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("lecturer/{Id}/recomendations")]
        public async Task<ActionResult> getLecturerRecommendations([FromRoute] string Id)
        {
            try
            {
                var recEvent = await _ievent!.getLecturerRecomendations(Id);
                if (recEvent == null)
                {
                    return NoContent();
                }
                return Ok(recEvent);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("students/{Id}/recomendations")]
        public async Task<ActionResult> getStudentRecommendations([FromRoute] string Id)
        {
            try
            {
                var queryEvent = await _ievent!.getStudentRecomendations(Id);
                if (queryEvent == null)
                {
                    return NoContent();
                }
                return Ok(queryEvent);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<ActionResult> createEvent([FromForm] Event_DTO newEvent)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var mainEvent = await _ievent!.CreateEvent(newEvent);
                    if (mainEvent.ToString() == "Event created")
                    {
                        return Ok(mainEvent);
                    }
                    return BadRequest(mainEvent);
                }
                return BadRequest("Please fill the form correctly");
                
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<ActionResult> updateEvent([FromForm] Event_DTO editEvent, [FromRoute] string id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var myEvent = await _ievent!.UpdateEvent(id, editEvent);
                    if (myEvent.ToString() == "Event updated")
                    {
                        return Ok(myEvent);
                    }
                    if(myEvent.ToString() == "Event not found")
                    {
                        return NotFound();
                    }
                    return BadRequest(myEvent);
                }
                return BadRequest("Please fill the form correctly");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public async Task<ActionResult> deleteEvent([FromRoute] string id)
        {
            try
            {
                var myEvent = await _ievent!.DeleteEvent(id);
                if (myEvent.ToString() == "Deleted successfuly")
                {
                    return Ok(myEvent);
                }
                return NotFound();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
