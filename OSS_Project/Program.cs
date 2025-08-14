using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using OSS_Project.Data;

namespace OSS_Project
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // 添加 MVC 控制器服务
            builder.Services.AddControllers();
            // 添加 Swagger 生成器服务
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "My API",
                    Version = "v1"
                });
            });
            builder.Services.AddDbContext<StoreContext>(opt =>
            {
                opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")); // 使用 SQLite 数据库
            });
            builder.Services.AddCors();



            var app = builder.Build();

            // 确保数据库已创建并初始化
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
                context.Database.Migrate(); // 应用数据库迁移
                DbInitializer.Initialize(context);
            }

            // 启用 Swagger（只在开发环境）
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger(); // 提供 swagger.json
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                    c.RoutePrefix = string.Empty; // ✅ 关键：让 "/" 就是 Swagger UI
                });
            }



            //app.UseHttpsRedirection();

            app.UseCors(opt =>
            {
                opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"); // 允许来自特定源的跨域请求
            });

            app.UseAuthorization();

            app.MapControllers(); // 映射控制器路由

            app.Run();
        }
    }
}
