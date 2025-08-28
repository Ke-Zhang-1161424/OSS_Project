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
                await _next(context); // ������һ���м��
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message); // ��¼�쳣��־
                context.Response.ContentType = "application/json"; // ������Ӧ��������Ϊ JSON
                context.Response.StatusCode = 500; // ������Ӧ״̬��Ϊ 500������������
                var response = _env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString()) // ���������·�����ϸ������Ϣ
                    : new ApiException(context.Response.StatusCode, "Server Error"); // ���������·���ͨ�ô�����Ϣ
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }; // ʹ���շ����������л� JSON
                var json = JsonSerializer.Serialize(response, options); // ���л���Ӧ����Ϊ JSON
                await context.Response.WriteAsync(json); // �� JSON д����Ӧ��
            }
        }
    }
}