using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using GrandOakOrders.Data.Entities;
using Microsoft.AspNet.Identity;

namespace GrandOakOrders.Data.Repositories
{
    public class UserRepository : IUserStore<User, string>, IUserLoginStore<User, string>
    {
        private GrandOakDbContext _context = new GrandOakDbContext();

#region IUserStore
        public async Task CreateAsync(User user)
        {
            var existing = await FindByIdAsync(user.Id);
            if (existing == null) {
                user.CreatedAt = user.UpdatedAt = DateTime.Now;
                _context.Users.Add(user);
            } else if (existing.AccessToken != user.AccessToken) {
                existing.UpdatedAt = DateTime.Now;
                existing.AccessToken = user.AccessToken;
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> FindByIdAsync(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user;
        }

        public async Task<User> FindByNameAsync(string userName)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            return user;
        }

        public async Task UpdateAsync(User user)
        {
            user.UpdatedAt = DateTime.Now;
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
#endregion

        #region IUserLoginStore
        public async Task AddLoginAsync(User user, UserLoginInfo login)
        {
            var existing = await _context.Users.FindAsync(login.ProviderKey);
            if (existing == null) {
                user.CreatedAt = user.UpdatedAt = DateTime.Now;
                _context.Users.Add(user);
            } else if (existing.AccessToken != login.ProviderKey) {
                existing.UpdatedAt = DateTime.Now;
                existing.AccessToken = login.ProviderKey;
            }

            await _context.SaveChangesAsync();
        }

        public Task RemoveLoginAsync(User user, UserLoginInfo login)
        {
            throw new NotImplementedException();
        }

        public Task<IList<UserLoginInfo>> GetLoginsAsync(User user)
        {
            throw new NotImplementedException();
        }

        public async Task<User> FindAsync(UserLoginInfo login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.AccessToken == login.ProviderKey);
            return user;
        }
        #endregion

        #region IDisposable Support
        private bool disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue) {
                if (disposing) {
                    if(_context != null) {
                        _context.Dispose();
                    }
                }

                _context = null;

                disposedValue = true;
            }
        }
        
        public void Dispose()
        {
            Dispose(true);
        }        
        #endregion
    }
}