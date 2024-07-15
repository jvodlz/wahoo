using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace wahoo.Server.Models;

public class WahooDBContext: IdentityDbContext<ApplicationUser>
{
    public WahooDBContext(DbContextOptions<WahooDBContext> options) : base(options) { }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
