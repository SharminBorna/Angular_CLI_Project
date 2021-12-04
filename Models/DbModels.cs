using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Ng_work.Models
{
    public class Designation
    {
        public Designation()
        {
            this.Members = new List<Member>();
        }
        public int DesignationId { get; set; }
        [Required, StringLength(40), Display(Name = "Designation")]
        public string DesiName { get; set; }
        
        //nev
        public virtual ICollection<Member> Members { get; set; }
    }
    public class Member
    {
        public int MemberId { get; set; }
        [Required, StringLength(50), Display(Name = "Member Name")]
        public string MemberName { get; set; }
        //fk
        [Required, ForeignKey("Designation"), Display(Name = "Designation")]
        public int DesignationId { get; set; }
        [Required, Display(Name = "Joining Date"), Column(TypeName = "date")]
        public DateTime JoiningDate { get; set; }
        [Required, StringLength(10)]
        public string Gender { get; set; }
        [StringLength(200)]
        public string Picture { get; set; }
        //nev
        public virtual Designation Designation { get; set; }
    }
    public class ReciterDbContext : DbContext
    {
        public ReciterDbContext(DbContextOptions<ReciterDbContext> options) : base(options)
        {

        }
        public DbSet<Designation> Designations { get; set; }
        public DbSet<Member> Members { get; set; }
    }
}
