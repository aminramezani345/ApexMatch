TailwindCSS Patch
=================
1) Copy the following files into the ROOT of your project (same folder as package.json):
   - tailwind.config.js
   - postcss.config.js

2) Copy `src/index.css` into your project's `src/` folder.
   If your `src/main.jsx` does not `import './index.css'`, replace it with the provided one
   or add: `import './index.css'` to the top of your existing `src/main.jsx`.

3) Install the necessary packages:
   npm i -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p   # (this creates config files; you can overwrite with ours)

4) Start the dev server:
   npm run dev

If you see unstyled UI, ensure your components/pages use Tailwind classes
and that `content` globs in tailwind.config.js cover your files (./src/**/*.{js,jsx,ts,tsx}).
