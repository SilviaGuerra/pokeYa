export async function fetchFn(endpoint: string) {
  const response = await fetch(endpoint);
  return response.json();
}

export async function fetchAllPokemon({pageParam}: {pageParam?: string}) {
  const response = await fetch(
    pageParam || 'https://pokeapi.co/api/v2/pokemon/',
  );
  return response.json();
}
