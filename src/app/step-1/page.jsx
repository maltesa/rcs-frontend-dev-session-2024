import { PokemonPicker } from "./PokemonPicker";

export default function Step1() {
  return (
    <div>
      <h2 className="text-2xl font-bold font-sans">
        Step 1: Pick up to 5 Pokemon
      </h2>
      <PokemonPicker />
    </div>
  );
}
