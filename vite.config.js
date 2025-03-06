import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({ hostname: 'https://tiptamcode.com',
      routes: ["/services", "/contact ", 
        "apropos","realisation","/"]
     }) // Remplace par ton domaine
  ,
],

build: {
  outDir: "dist", // Assurez-vous que la sortie est "dist"
},

});
