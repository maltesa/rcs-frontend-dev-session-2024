"use client";

import { Button } from "@/components/Button";
import Link from "next/link";
import { useState } from "react";

export function PokemonPicker() {
  const [pokemons, setPokemons] = useState([]);

  const handleSubmit = (formData) => {
    const pokemon = formData.get("pokemon");

    if (pokemons.length >= 5) {
      alert("You can only pick up to 5 Pokemon");
      return;
    }

    setPokemons((pokemons) => [...pokemons, pokemon]);
  };

  const remove = (i) => {
    setPokemons((pokemons) => pokemons.filter((_, index) => index !== i));
  };

  const uriEncodedPokemons = encodeURIComponent(JSON.stringify(pokemons));

  return (
    <div className="mt-8">
      <form className="flex gap-2" action={handleSubmit}>
        <input
          name="pokemon"
          type="text"
          placeholder="Name"
          className="border-2 border-black rounded-md p-2 flex-1"
        />

        <Button>Add</Button>
      </form>

      <h3 className="text-2xl font-bold font-sans mt-8 mb-2">
        Your chosen Pokemon
      </h3>
      <ol className="flex flex-col gap-1">
        {pokemons.length === 0 && (
          <li>
            <p className="text-gray-500">
              You haven&apos;t chosen any Pokemon yet
            </p>
          </li>
        )}
        {pokemons.map((pokemon, i) => (
          <li
            key={i}
            className="flex gap-2 justify-between rounded-md bg-gray-100 border hover:bg-gray-300 py-2 px-4"
          >
            {pokemon}{" "}
            <button
              onClick={() => remove(i)}
              className="font-medium text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ol>

      {pokemons.length > 0 && (
        <Link legacyBehavior href={`/step-2/${uriEncodedPokemons}`}>
          <Button
            as="a"
            className="block mt-8"
            variant={pokemons.length < 2 ? "outline" : "default"}
          >
            I&apos;m read, continue to Step 2
          </Button>
        </Link>
      )}
    </div>
  );
}
