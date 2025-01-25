// import type { PageTree } from 'fumadocs-core/server';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { blog } from '@/.source';

export const source = loader({
  baseUrl : '/blog',
  source : createMDXSource(blog,[])
})