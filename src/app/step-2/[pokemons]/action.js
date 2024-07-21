"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function generateStoryAction(state, formData) {
  const pokeData = formData.get("pokemonInfo");
  const additional = formData.get("additional");

  const prompt = `
    You are an expert storyteller. You have been asked to write a story about the following Pokemon:
    \`\`\`json
    ${pokeData}
    \`\`\`

    Additionally, you have been asked to add the following instructions to the story:
    \`\`\`
    ${additional ?? "none"}
    \`\`\`

    Write a story about the Pokemon that is as detailed as possible, but also as short as possible.
    Use the following format (No Markdown):
    Title: The title of the story
    ... the story itself ...
    `;
  console.log(prompt);

  const { text } = await generateText({ model: openai("gpt-4o"), prompt });

  let [title, ...lines] = text.trim().split("\n");
  const story = lines.join("\n");
  title = title.replace(/title:\s*/i, "").trim();

  return { title, story };
}
