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
