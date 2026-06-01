export const fetchPokemonList = async (limit = 50) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  if (!response.ok) throw new Error("No fue posible acceder a la API");
  return await response.json();
};

export const fetchPokemonByName = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) throw new Error("No se encontró el Pokémon");
  return await response.json();
};
