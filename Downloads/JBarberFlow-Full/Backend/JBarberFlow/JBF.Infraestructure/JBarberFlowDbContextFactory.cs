using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace JBF.Infraestructure
{
    using Data;
    public class JBarberFlowDbContextFactory : IDesignTimeDbContextFactory<JBarberFlowDbContext>
    {
        public JBarberFlowDbContext CreateDbContext(string[] args)
        {
            var basePath = Path.Combine(Directory.GetCurrentDirectory(), "..", "JBF.Api");

            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var builder = new DbContextOptionsBuilder<JBarberFlowDbContext>();
            builder.UseSqlServer(connectionString);

            return new JBarberFlowDbContext(builder.Options);
        }
    }
}