# Basic Webpack setup

### Overview
This setup includes a basic webpack setup for scss and js.

### Getting Start
- Copy all files into your repository
- run `npm install`
- Now run `npm run build`
- Your assets are build into a `dist` folder. `dist/main.js` & `dist/main.css`

### How it works
The main files to look at are the `webpack.config.js` and the `package.json` files.

You will see that watch is set to true globally. This will mean files changes will be checked and compiled as you go.

The webpack config contains 2 main `rules`. One for JS and one for scss.

The JS rule uses babel to compile as JS added to `src/js/index.js` into `dist/bundle.js`. You can write ES6 here, it will be compiled into ES5.

The SCSS rule has a few more `loaders`.
- It contains a scss loader that converts scss to css.
- It contains a `postcss` loader with rules defined in `postcss.config.js`. You will see that this imports an auto prefixer meaning that styles such as `dsiplay:flex` will be output as `display:-webkit-box;display:flex;`
- It contains a scss resource loader. This allows global scss files to be automatically imported to all your scss files. This is great for variables and mixins but should never import files that create actual scss. I've set this up to import 2 files `src/scss/vars.scss` and `src/scss/mixins.scss`.