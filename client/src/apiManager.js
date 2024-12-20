export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
};

export const getDogById = async (id) => {
  const res = await fetch(`/api/dogs/${id}`);
  return res.json();
};

export const addDog = async (dog) => {
  const res = await fetch(`/api/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  });
};

export const getCities = async () => {
  const res = await fetch(`/api/cities`);
  return res.json();
};

export const getWalkers = async () => {
  const res = await fetch(`/api/walkers`);
  return res.json();
};

export const getWalkerCities = async () => {
  const res = await fetch(`/api/walkercities`);
  return res.json();
};
