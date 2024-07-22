import { SelectPokemon } from "./SelectPokemon";

export default function Step1() {
  return (
    <div>
      <h2 className="text-3xl font-bold">Step 1: Pick up to 5 Pokemon</h2>

      <SelectPokemon />
    </div>
  );
}
