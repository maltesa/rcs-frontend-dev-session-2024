"use client";

import { Button } from "@/components/Button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { generateStoryAction } from "./generateStoryAction";

export function GenerateForm({ specs }) {
  const [story, storyAction] = useActionState(generateStoryAction, null);

  return (
    <form action={storyAction} method="POST">
      <input type="hidden" name="specs" value={JSON.stringify(specs)} />
      <h3 className="text-2xl font-bold mt-8 mb-2">
        Additional context for your story
      </h3>
      <textarea
        name="additional"
        className="w-full h-32 p-4 rounded-md border border-black"
        placeholder="E.g. the moon is full of Pokemon"
      ></textarea>

      <SubmitButton />

      {story && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold">{story.title}</h2>
          <div className="whitespace-pre-wrap mt-4">{story.story}</div>
        </div>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-2 !p-6 text-2xl" disabled={pending}>
      {pending ? "Generating..." : "Generate story"}
    </Button>
  );
}
