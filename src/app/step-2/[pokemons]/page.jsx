import { getPokemonData } from "@/getPokemonData";
import { StoryForm } from "./StoryForm";

export default async function Step2(props) {
  const decodedPokemons = decodeURIComponent(props.params.pokemons);
  const pokemons = JSON.parse(decodedPokemons);
  const pokemonInfo = (await Promise.all(pokemons.map(getPokemonData))).filter(
    Boolean
  );

  return (
    <div>
      <h2 className="text-2xl font-bold font-sans">Step 2: Additional Data</h2>

      <StoryForm pokemonInfo={pokemonInfo} />
    </div>
  );
}
