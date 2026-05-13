import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { CATEGORIES } from "./consts";

// Derives the enum tuple from the CATEGORIES keys at build time.
// If you add a new key to CATEGORIES, the schema picks it up automatically
const categorySlugs = Object.keys(CATEGORIES) as [
	keyof typeof CATEGORIES,
	...Array<keyof typeof CATEGORIES>
];

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),

	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		category: z.enum(categorySlugs),
		heroImage: image().optional(),
		heroImageAlt: z.string().optional(),
		heroFit: z.enum(["cover", "contain"]).optional().default("cover"),
		heroAspectRatio: z.string().optional(), // e.g. "3 / 1", "16 / 9"
		heroPortrait: z.boolean().optional().default(false),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = { blog };
