"use client";

import { Button } from "@/components/Button";
import Link from "next/link";
import { useState } from "react";

export function SelectPokemon() {
  const [pokemon, setPokemon] = useState([]);
  const encodedPokemon = encodeURIComponent(JSON.stringify(pokemon));

  const handleSubmit = (formData) => {
    const name = formData.get("pokemon");
    setPokemon([...pokemon, name]);
  };

  const handleRemove = (name) => {
    setPokemon(pokemon.filter((pokemon) => pokemon !== name));
  };

  return (
    <div>
      <form className="mt-8" action={handleSubmit}>
        <div className="flex flex-col gap-2">
          <input
            name="pokemon"
            type="text"
            placeholder="Pokemon name"
            className="border rounded-md w-full p-2 border-black"
          />
          <Button>Add</Button>
        </div>
      </form>

      <h3 className="text-2xl font-bold mt-4">Your Pokemon</h3>
      <div className="flex gap-2 flex-col">
        {pokemon.map((name, i) => {
          return (
            <div
              key={i}
              className="p-4 rounded-md border border-black flex gap-2 items-center"
            >
              <div className="flex-1">{name}</div>

              <button
                className="text-red-500"
                onClick={() => handleRemove(name)}
              >
                remove
              </button>
            </div>
          );
        })}
      </div>

      {pokemon.length > 0 && (
        <Button
          className="w-full mt-8 block"
          variant="outline"
          as={Link}
          href={`/step-2/${encodedPokemon}`}
        >
          Continue to step 2 with {pokemon.length} Pokemon
        </Button>
      )}
    </div>
  );
}
