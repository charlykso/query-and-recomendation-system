using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QandR_API.Collective;
using QandR_API.DTO;
using QandR_API.Repo;
using System.Data;

namespace QandR_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudent _istudent;
        public StudentController(IStudent istudent)
        {
            _istudent = istudent;
        }

        [Authorize]
        [HttpGet("getAll")]
        public async Task<ActionResult> getStudents()
        {
            try
            {
                var students = await _istudent.GetStudents();
                if (students == null)
                {
                    return NoContent();
                }
                return Ok(students);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}/get")]
        public async Task<ActionResult> getStudent([FromRoute] string id)
        {
            try
            {
                var student = await _istudent.GetStudent(id);
                if (student == null)
                {
                    return NoContent();
                }
                return Ok(student);
            }catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> createStudent([FromForm] Student_DTO newStudent)
        {
            const string A = "Email already exists";
            const string B = "Student created";
            const string C = "Something went wrong";
            try
            {
                if (ModelState.IsValid)
                {
                    var student = await _istudent.CreateStudent(newStudent);
                    switch(student.ToString())
                    {
                        case (A or C):
                            return BadRequest(student.ToString());
                        case B:
                            return Ok(student.ToString());
                        default:
                            return BadRequest(student.ToString());
                    }
                }
                return BadRequest("Please fill all required feild");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("{id}/update")]
        public async Task<ActionResult> updateStudent([FromForm] Student_DTO newStudent, [FromRoute] string id)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    var student = await _istudent.UpdateStudent(id, newStudent);
                    if (student.ToString() == "Student updated")
                    {
                        return Ok(student.ToString());
                    }
                    return BadRequest(student.ToString());
                }
                return BadRequest("Please fill all required feild");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{id}/delete")]
        public async Task<ActionResult> deleteStudent([FromRoute] string id)
        {
            try
            {
                var student = await _istudent.DeleteStudent(id);
                if (student.ToString() == "Deleted successfuly")
                {
                    return Ok(student.ToString());
                }
                return NotFound();

            }catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
