using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Collections.Generic;
using JBF.Domain.Base;

public interface IRepositoryBase<T> where T : class
{
    Task<ResultBase<IEnumerable<T>>> GetAllasync();
    Task<ResultBase<T>> GetbyIdasync(int id);
    Task<ResultBase<T>> Createasync(T entity);
    Task<ResultBase<T>> Updateasync(T entity);
    Task<ResultBase<T>> Deleteasync(T entity);
    Task<ResultBase<bool>> ExistsAsync(Expression<Func<T, bool>> condition);
    Task<ResultBase<T>> GetOneByConditionAsync(Expression<Func<T, bool>> condition);
}