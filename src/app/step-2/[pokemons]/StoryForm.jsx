"use client";

import { Button } from "@/components/Button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { generateStoryAction } from "./action";

export function StoryForm({ pokemonInfo }) {
  const [story, getStory] = useActionState(generateStoryAction, "");

  return (
    <form action={getStory}>
      <input
        type="hidden"
        name="pokemonInfo"
        value={JSON.stringify(pokemonInfo)}
      />
      <h3 className="text-xl font-bold font-sans">
        You&apos;ve chosen the following Pokemon:
      </h3>
      <ol className="grid grid-cols-2 gap-4 mt-4">
        {pokemonInfo.map(
          (
            { name, captureRate, height, baseExperience, habitatName, image },
            i
          ) => (
            <li
              key={i}
              className="grid grid-cols-2 gap-2 rounded-md bg-gray-100 border py-2 px-4"
            >
              {image && <img src={image} alt={name} className="w-44" />}
              <div className="flex flex-col gap-1 leading-tight">
                <p className="font-bold">Name: {name}</p>
                <p>Habitat: {habitatName}</p>
                <p>Height: {height}</p>
                <p>Capture Rate: {captureRate}</p>
                <p>Base Experience: {baseExperience}</p>
              </div>
            </li>
          )
        )}
      </ol>

      <h3 className="text-xl font-bold font-sans mt-8">
        Optional: Add some instructions for your story
      </h3>
      <textarea
        name="additional"
        rows="4"
        cols="50"
        className="w-full rounded-md border p-2 border-black"
        placeholder="Add some instructions for your story"
      ></textarea>

      <SubmitButton />

      {story && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold border-b border-black">
            {story.title}
          </h2>
          <div className="whitespace-pre-wrap">{story.story}</div>
        </div>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="text-3xl mt-8">
      {pending ? "Generating..." : "Write my Story"}
    </Button>
  );
}
