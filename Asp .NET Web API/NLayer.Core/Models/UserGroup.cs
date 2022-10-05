using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NLayer.Core.Models
{
    public class UserGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Role> Roles{ get; set; }
    }
}
