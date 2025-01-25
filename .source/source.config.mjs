// source.config.ts
import { transformerRemoveNotationEscape } from "@shikijs/transformers";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import {
  defineCollections,
  defineConfig,
  frontmatterSchema
} from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { z } from "zod";
var blog = defineCollections({
  dir: "content",
  schema: frontmatterSchema.extend({
    date: z.string().or(z.date()).transform((value, context) => {
      try {
        return new Date(value);
      } catch {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid date"
        });
        return z.NEVER;
      }
    }),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    cover_url: z.string().url().optional(),
    author: z.string()
  }),
  type: "doc"
});
var source_config_default = defineConfig({
  generateManifest: true,
  lastModifiedTime: "git",
  mdxOptions: {
    rehypeCodeOptions: {
      inline: "tailing-curly-colon",
      themes: {
        light: "min-light",
        dark: "aurora-x"
      },
      transformers: [
        ...rehypeCodeDefaultOptions.transformers ?? [],
        transformerRemoveNotationEscape()
      ]
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v]
  }
});
export {
  blog,
  source_config_default as default
};
