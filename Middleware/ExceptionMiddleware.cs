namespace OSS_Project.Middleware 
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Ilogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, Ilogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context); // 调用下一个中间件
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message); // 记录异常日志
                context.Response.ContentType = "application/json"; // 设置响应内容类型为 JSON
                context.Response.StatusCode = 500; // 设置响应状态码为 500（服务器错误）
                var response = _env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) // 开发环境下返回详细错误信息
                    : new ApiException(context.Response.StatusCode, "Server Error"); // 生产环境下返回通用错误信息
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }; // 使用驼峰命名法序列化 JSON
                var json = JsonSerializer.Serialize(response, options); // 序列化响应对象为 JSON
                await context.Response.WriteAsync(json); // 将 JSON 写入响应体
            }
        }
    }
}