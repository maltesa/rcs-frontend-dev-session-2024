import { GenerateForm } from "./GenerateForm";
import { getPokemonData } from "./getPokemonData";

export default async function Step2({ params }) {
  const pokemons = JSON.parse(decodeURIComponent(params.pokemons));
  const specs = await Promise.all(pokemons.map((name) => getPokemonData(name)));

  return (
    <div>
      <h2 className="text-2xl font-bold">Step 2</h2>{" "}
      <div className="grid grid-cols-2 gap-4">
        {specs.map((spec, i) => {
          return (
            <div key={i} className="p-4 rounded-md border border-black">
              <h3 className="text-xl font-bold">{spec.name}</h3>
              <p>Capture Rate: {spec.captureRate}</p>
              <p>Height: {spec.height} inches</p>
              <p>Base Experience: {spec.baseExperience}</p>
              <p>Habitat: {spec.habitatName}</p>
              <img src={spec.image} alt={spec.name} />
            </div>
          );
        })}
      </div>
      <GenerateForm specs={specs} />
    </div>
  );
}
