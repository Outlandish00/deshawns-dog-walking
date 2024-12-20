using System.Reflection.Metadata.Ecma335;
using Deshawns.Models;
using Deshawns.Models.DTOs;
using Microsoft.AspNetCore.Mvc.Rendering;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

List<Dog> dogs = new List<Dog>
{
    new Dog()
    {
        Id = 1,
        Name = "Josephine",
        WalkerId = null,
        CityId = 2,
    },
    new Dog()
    {
        Id = 2,
        Name = "Sasha",
        WalkerId = 1,
        CityId = 2,
    },
};

List<City> cities = new List<City>
{
    new City() { Id = 1, Name = "San Francisco" },
    new City() { Id = 2, Name = "Nashville" },
    new City() { Id = 3, Name = "Baltimore" },
    new City() { Id = 4, Name = "Louisville" },
    new City() { Id = 5, Name = "Gotham" },
};

List<Walker> walkers = new List<Walker>
{
    new Walker() { Id = 1, Name = "Jessica" },
    new Walker() { Id = 2, Name = "Nick" },
    new Walker() { Id = 3, Name = "Jayden" },
    new Walker() { Id = 4, Name = "Bruce Wayne" },
    new Walker() { Id = 5, Name = "Literally Bayne" },
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity()
    {
        Id = 1,
        WalkerId = 1,
        CityId = 1,
    },
    new WalkerCity()
    {
        Id = 2,
        WalkerId = 1,
        CityId = 2,
    },
    new WalkerCity()
    {
        Id = 3,
        WalkerId = 2,
        CityId = 2,
    },
    new WalkerCity()
    {
        Id = 4,
        WalkerId = 2,
        CityId = 3,
    },
    new WalkerCity()
    {
        Id = 5,
        WalkerId = 3,
        CityId = 4,
    },
    new WalkerCity()
    {
        Id = 6,
        WalkerId = 4,
        CityId = 5,
    },
    new WalkerCity()
    {
        Id = 7,
        WalkerId = 5,
        CityId = 5,
    },
};

//Gets all dogs with all info if available
app.MapGet(
    "/api/dogs",
    () =>
    {
        return dogs.Select(dog =>
        {
            Walker foundWalker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
            City foundCity = cities.FirstOrDefault(c => c.Id == dog.CityId);

            return new DogDTO
            {
                Id = dog.Id,
                Name = dog.Name,
                WalkerId = dog.WalkerId,
                Walker =
                    foundWalker != null
                        ? new WalkerDTO { Id = foundWalker.Id, Name = foundWalker.Name }
                        : null,
                CityId = dog.CityId,
                City =
                    foundCity != null
                        ? new CityDTO { Id = foundCity.Id, Name = foundCity.Name }
                        : null,
            };
        });
    }
);

//Gets all walkers
app.MapGet(
    "/api/walkers",
    () =>
    {
        return walkers.Select(w => new WalkerDTO { Id = w.Id, Name = w.Name });
    }
);

//Gets all Cities
app.MapGet(
    "/api/cities",
    () =>
    {
        return cities.Select(c => new CityDTO { Id = c.Id, Name = c.Name });
    }
);

//Gets all walkerCities
app.MapGet(
    "/api/walkercities",
    () =>
    {
        return walkerCities.Select(wc =>
        {
            Walker foundWalker = walkers.FirstOrDefault(w => w.Id == wc.WalkerId);
            City foundCity = cities.FirstOrDefault(c => c.Id == wc.CityId);
            return new WalkerCityDTO
            {
                Id = wc.Id,
                WalkerId = wc.WalkerId,
                Walker = new WalkerDTO { Id = foundWalker.Id, Name = foundWalker.Name },
                CityId = wc.CityId,
                City = new CityDTO { Id = foundCity.Id, Name = foundCity.Name },
            };
        });
    }
);

app.MapGet(
    "/api/dogs/{id}",
    (int id) =>
    {
        Dog foundDog = dogs.FirstOrDefault(d => d.Id == id);
        Walker foundWalker = walkers.FirstOrDefault(w => w.Id == foundDog.WalkerId);
        City foundCity = cities.FirstOrDefault(c => c.Id == foundDog.CityId);
        if (foundDog == null)
        {
            return Results.NotFound();
        }
        return Results.Ok(
            new DogDTO
            {
                Id = foundDog.Id,
                Name = foundDog.Name,
                WalkerId = foundDog.WalkerId,
                Walker =
                    foundWalker != null
                        ? new WalkerDTO { Id = foundWalker.Id, Name = foundWalker.Name }
                        : null,
                CityId = foundDog.CityId,
                City =
                    foundCity != null
                        ? new CityDTO { Id = foundCity.Id, Name = foundCity.Name }
                        : null,
            }
        );
    }
);
app.MapPost(
    "/api/dogs",
    (Dog newDog) =>
    {
        Walker foundWalker = walkers.FirstOrDefault(w => w.Id == newDog.WalkerId);
        City foundCity = cities.First(c => c.Id == newDog.CityId);

        newDog.Id = dogs.Max(d => d.Id) + 1;
        dogs.Add(newDog);
        return Results.Created(
            $"/dogs/{newDog.Id}",
            new DogDTO
            {
                Id = newDog.Id,
                Name = newDog.Name,
                WalkerId = foundWalker?.Id,
                Walker =
                    foundWalker != null
                        ? new WalkerDTO { Id = foundWalker.Id, Name = foundWalker.Name }
                        : null,
                CityId = foundCity.Id,
                City =
                    foundCity != null
                        ? new CityDTO { Id = foundCity.Id, Name = foundCity.Name }
                        : null,
            }
        );
    }
);
app.Run();
