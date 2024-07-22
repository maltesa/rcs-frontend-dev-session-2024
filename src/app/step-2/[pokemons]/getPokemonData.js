function flattenPokemonJson(pokemon) {
  return {
    name: pokemon?.[0]?.name,
    captureRate: pokemon?.[0]?.spec?.capture_rate,
    height: pokemon?.[0]?.spec.data?.[0]?.height,
    baseExperience: pokemon?.[0]?.spec.data?.[0]?.base_experience,
    habitatName: pokemon?.[0]?.spec?.habitat?.name,
    image: pokemon?.[0]?.spec.data?.[0]?.images?.[0]?.sprites.front_default,
  };
}

function getQuery(name) {
  return JSON.stringify({
    operationName: "pokemonData",
    variables: null,
    query: `query pokemonData {
            pokemon: pokemon_v2_pokemonspeciesname(limit: 1, where: {language_id: {_eq: 6}, name: {_ilike: "${name}%"}}) {
              name
              spec: pokemon_v2_pokemonspecy {
                capture_rate
                data: pokemon_v2_pokemons {
                  base_experience
                  height
                  images: pokemon_v2_pokemonsprites {
                    sprites
                  }
                }
                habitat: pokemon_v2_pokemonhabitat {
                  name
                }
              }
            }
          }
          `,
  });
}

export async function getPokemonData(name) {
  const body = getQuery(name);
  const r = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    next: { revalidate: 60 * 60 },
    body,
    method: "POST",
  });

  const json = await r.json();
  if (!json.data.pokemon[0]) {
    return null;
  }

  const pokemonSpecs = flattenPokemonJson(json.data.pokemon);
  return pokemonSpecs;
}
