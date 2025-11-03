using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JBF.Domain.Entities
{
    public class MDisponibilidad
    {
        [Key]
        public int ID_Disponibilidad { get; set; }
        public required MEstilista Estilista { get; set; }
        public DayOfWeek DiaSemana { get; set; }
        public TimeSpan HoraInicio { get; set; }
        public TimeSpan HoraFin { get; set; }
    }
}
