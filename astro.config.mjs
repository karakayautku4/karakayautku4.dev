import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://karakayautku4.dev',
  output: 'static',
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: false,
    },
  },
});
