"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function generateStoryAction(_state, formData) {
  const specs = JSON.parse(formData.get("specs"));
  const additional = formData.get("additional");

  const prompt = `
    You are a brief storyteller. You are writing a short story about a group of Pokemon.
    Here are the specifications of the Pokemon (delimited by triple backticks):
    \`\`\`
    ${JSON.stringify(specs, null, 2)}
    \`\`\`

    Additionally use the following information to write a story about the Pokemon:
    \`\`\`
    ${additional}
    \`\`\`

    Use the following format:
    Title: Story
    ... story ...
    `;

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  console.log(text);

  const [first, ...rest] = text.split("\n");
  const title = first.split(":")[1].trim();
  const story = rest.join("\n");

  return { title, story };
}
