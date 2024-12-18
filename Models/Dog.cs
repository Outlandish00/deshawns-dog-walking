using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Deshawns.Models;

public class Dog
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int? WalkerId { get; set; }
    public int? CityId { get; set; }
}
