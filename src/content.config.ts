import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const docs = defineCollection({
	loader: glob({ base: "./src/content/docs", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		source: z.string().url().or(z.string().startsWith("/")),
	}),
});

export const collections = { docs };
