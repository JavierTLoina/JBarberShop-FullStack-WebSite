using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

// 1. Necesario para IRepositoryBase y ResultBase (Confirmado: JBF.Domain.Base)
using JBF.Domain.Base;

// 2. Necesario para JBarberFlowDbContext (Asumiendo JBF.Infraestructure.Data)
using JBF.Infraestructure.Data;


namespace JBF.Infraestructure.Base // El namespace de la clase RepositoryBase
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        // Propiedad del DbContext
        protected readonly JBarberFlowDbContext _context;

        public RepositoryBase(JBarberFlowDbContext context)
        {
            _context = context;
        }

        // --- MÉTODOS CRUD COMPLETOS (RESUELVE CS0535) ---

        // RESUELVE: '...does not implement interface member IRepositoryBase<T>.GetAllasync'
        public async Task<ResultBase<IEnumerable<T>>> GetAllasync()
        {
            var result = new ResultBase<IEnumerable<T>>();
            try
            {
                result.Data = await _context.Set<T>().ToListAsync();
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = $"Error al obtener todos los registros: {ex.Message}";
            }
            return result;
        }

        // RESUELVE: '...does not implement interface member IRepositoryBase<T>.GetbyIdasync'
        public async Task<ResultBase<T>> GetbyIdasync(int id)
        {
            var result = new ResultBase<T>();
            try
            {
                var data = await _context.Set<T>().FindAsync(id);
                if (data == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Registro no encontrado.";
                    return result;
                }
                result.IsSuccess = true;
                result.Data = data;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = $"Error al obtener por ID: {ex.Message}";
            }
            return result;
        }

        // RESUELVE: '...does not implement interface member IRepositoryBase<T>.Createasync'
        public async Task<ResultBase<T>> Createasync(T entity)
        {
            var result = new ResultBase<T>();
            try
            {
                await _context.Set<T>().AddAsync(entity);
                await _context.SaveChangesAsync();
                result.Data = entity;
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = $"Error al crear el registro: {ex.Message}";
            }
            return result;
        }

        // RESUELVE: '...does not implement interface member IRepositoryBase<T>.Updateasync'
        public async Task<ResultBase<T>> Updateasync(T entity)
        {
            var result = new ResultBase<T>();
            try
            {
                _context.Set<T>().Update(entity);
                await _context.SaveChangesAsync();
                result.Data = entity;
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = $"Error al actualizar el registro: {ex.Message}";
            }
            return result;
        }

        // RESUELVE: '...does not implement interface member IRepositoryBase<T>.Deleteasync'
        public async Task<ResultBase<T>> Deleteasync(T entity)
        {
            var result = new ResultBase<T>();
            try
            {
                _context.Set<T>().Remove(entity);
                await _context.SaveChangesAsync();
                result.Data = entity;
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = $"Error al eliminar el registro: {ex.Message}";
            }
            return result;
        }

        // RESUELVE: '...does not implement interface member IRepositoryBase<T>.ExistsAsync'
        public async Task<ResultBase<bool>> ExistsAsync(Expression<Func<T, bool>> condition)
        {
            var result = new ResultBase<bool>();
            try
            {
                result.Data = await _context.Set<T>().AnyAsync(condition);
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = $"Error al verificar existencia: {ex.Message}";
            }
            return result;
        }


        // --- MÉTODO DEL LOGIN ---
        public async Task<ResultBase<T>> GetOneByConditionAsync(Expression<Func<T, bool>> condition)
        {
            var result = new ResultBase<T>();
            try
            {
                var data = await _context.Set<T>()
                                         .FirstOrDefaultAsync(condition);

                if (data == null)
                {
                    result.IsSuccess = false;
                    result.Message = "Registro no encontrado o condición no cumplida.";
                    return result;
                }

                result.IsSuccess = true;
                result.Data = data;
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = $"Error al obtener por condición: {ex.Message}";
            }
            return result;
        }
    }
}