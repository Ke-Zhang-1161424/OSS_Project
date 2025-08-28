using Microsoft.AspNetCore.Mvc;

namespace OSS_Project.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        { 
            return NotFound(); // 返回 404 Not Found 响应
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title = "This is a bad request"}); // 返回 400 Bad Request 响应
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return GetUnauthorized(); // 返回 401 Unauthorized 响应
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is the first error"); // 添加第一个模型错误
            ModelState.AddModelError("Problem1", "This is the second error"); // 添加第二个模型错误
            return ValidationProblem(); // 返回 400 Bad Request 响应，包含模型验证错误
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error"); // 抛出一个异常，模拟服务器错误
        }


    }
}
