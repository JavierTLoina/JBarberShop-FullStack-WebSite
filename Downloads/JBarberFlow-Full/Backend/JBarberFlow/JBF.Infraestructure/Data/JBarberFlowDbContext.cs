using Microsoft.EntityFrameworkCore;
using JBF.Domain.Entities;

namespace JBF.Infraestructure.Data
{
    public class JBarberFlowDbContext : DbContext
    {
        public JBarberFlowDbContext(DbContextOptions<JBarberFlowDbContext> options)
            : base(options)
        {
        }

        public DbSet<MUsers> Usuarios { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MUsers>()
                .HasKey(u => u.ID_User);
            base.OnModelCreating(modelBuilder);
        }
    }
}