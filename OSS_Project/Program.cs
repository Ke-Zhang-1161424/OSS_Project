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

            // ��� Swagger ����������
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
                opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")); // ʹ�� SQLite ���ݿ�
            });

            // ��� MVC ����������
            builder.Services.AddControllers();

            var app = builder.Build();

            // ȷ�����ݿ��Ѵ�������ʼ��
            using (var scope = app.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
                context.Database.Migrate(); // Ӧ�����ݿ�Ǩ��
                DbInitializer.Initialize(context);
            }

            // ���� Swagger��ֻ�ڿ���������
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger(); // �ṩ swagger.json
                app.UseSwaggerUI(c => // �ṩ���ӻ�ҳ��
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers(); // ӳ�������·��

            app.Run();
        }
    }
}
