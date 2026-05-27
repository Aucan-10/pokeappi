import { API_BASE_URL, POKEMON_LIMIT } from "../utils/constants";

export const fetchPokemonList = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pokemon?limit=${POKEMON_LIMIT}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener la lista de Pokémon");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchPokemonList:", error);
    throw error;
  }
};

export const fetchPokemonByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);
    if (!response.ok) {
      throw new Error(`Pokémon "${name}" no encontrado`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en fetchPokemonByName:", error);
    throw error;
  }
};
