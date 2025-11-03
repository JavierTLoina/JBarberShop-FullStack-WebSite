// JBF.Infraestructure/BD/Context.cs (o JBF.Persistence/BD/Context.cs)

using Microsoft.EntityFrameworkCore;
using JBF.Domain.Entities;

namespace JBF.Persistence.BD
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }

        // ⭐️ PARTE 1: DEFINICIÓN COMPLETA DE DbSets (Mapeo de todas tus tablas) ⭐️
        public DbSet<MUsers> MUsers { get; set; }
        public DbSet<MCitas> MCitas { get; set; }
        public DbSet<MEstilista> MEstilista { get; set; }
        public DbSet<MServicio> MServicio { get; set; }
        public DbSet<MDisponibilidad> MDisponibilidad { get; set; } // Agregamos el que falta


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ⭐️ CONFIGURACIÓN DE MUsers (Todo limpio y mapeado) ⭐️
            modelBuilder.Entity<MUsers>(entity =>
            {
                entity.ToTable("Usuarios");
                entity.HasKey(e => e.ID_User);

                // Ya no necesitamos esto si el C# y SQL coinciden:
                // entity.Property(e => e.PasswordHash).HasColumnName("PasswordHash");
            });

            // ⭐️ CONFIGURACIÓN DE MCitas ⭐️
            modelBuilder.Entity<MCitas>(entity =>
            {
                entity.ToTable("Citas");
                entity.HasKey(e => e.ID_Citas);

            });

            // Mapeamos el resto de tablas que existen en tu BD
            modelBuilder.Entity<MEstilista>().ToTable("Estilistas");
            modelBuilder.Entity<MServicio>().ToTable("Servicios");
            modelBuilder.Entity<MDisponibilidad>().ToTable("Disponibilidades");

            base.OnModelCreating(modelBuilder);
        }
    }
}