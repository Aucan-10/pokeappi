const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

// Helper interno: evita repetir try/catch en cada función
const fetchAPI = async (url, fallback) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.log(`ERROR al llamar a ${url}:`, error.message);
    return fallback;
  }
};

export const getPokemon = async () => {
  const data = await fetchAPI(`${BASE_URL}?limit=50`, { results: [] });
  return data.results;
};

export const getUnPokemon = async (name) => {
  return await fetchAPI(`${BASE_URL}/${name}`, null);
};
