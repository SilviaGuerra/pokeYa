export const fetchFn = async (endpoint: string) => {
  const response = await fetch(endpoint);
  return response.json();
};

export const fetchAllPokemon = async ({pageParam}: {pageParam?: string}) => {
  const response = await fetch(
    pageParam || 'https://pokeapi.co/api/v2/pokemon/',
  );
  return response.json();
};

export const fetchPokemon = async (name: string) => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
  if (!response.ok) {
    throw new Error(`Pokemon ${name} no encontrado`);
  }
  return response.json();
};
