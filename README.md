# Julia-Set-Fratal

A Julia Set renderer, built with WebAssembly, Typescript, and HTML Canvas

## Program Output

![GIF Output](./public/set.gif 'Julia Set with different constants')

## Serving the website locally

```bash
npm run serve
```

## Bundling the website

```bash
npm run build
```

## Compiling AssemblyScript to WebAssembly

```bash
npm run asbuild
```

## Using JIT Mode on Tailwind CSS

```bash
npx tailwindcss -o tailwind.css --jit --purge "./**/*.html" --watch
```
