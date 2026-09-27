import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://karakayautku4.dev',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
