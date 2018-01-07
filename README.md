# Boilerplate Angular.js ES6

Check out the [demo](https://eduardomagaldi.github.io/boilerplate-angularjs-es6/public/) and the [tests](https://eduardomagaldi.github.io/boilerplate-angularjs-es6/public/tests).

## TLDR;

```npm run prod``` [http://localhost:8080/public](http://localhost:8080/public)

```npm run dev``` [http://localhost:8080](http://localhost:8080)

## About

Front-end project by [Eduardo Magaldi](https://github.com/eduardomagaldi), using:

- Angular.js (1)
- ui-router
- Stylus
- Twitter Bootstrap
- HTML5 Boilerplate
- Babel (ES6 and ES7)
- Webpack
- oc.LazyLoad
- Eslint
- Angular Mocks
- Mocha
- Chai
- Sinon

This project is inspired by [John Papa's Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md). You should read it for VERY USEFUL information about angular 1 development.

## Installing dependencies

First of all, please install node.js.

Then clone this repository, navigate to root folder (where package.json is) and run:

```npm install``` or install yarn and run ```yarn install``` (it's faster than npm)

## Production

In production mode:

1. All main files are bundled together, except for main css, which is a separate bundle, to make the page unobtrusive at least for css.
2. Extra states are lazy loaded, with all dependencies bundled together, including css.
3. All files are minified.

To generate all bundles for production install dependencies and run:

```npm run prod```

This will:

1. Generate bundles from ```components/main```: ```main.min.js```, ```test.min.js```, ```styles.min.css``` and all lazy loaded bundles, like ```0.min.js```, ```1.min.js``` and so on... All files are generated into ```public``` folder.
2. Run an express server on ```public``` folder to test production mode.

After bundles are created and with express server still running, go to [http://localhost:8080/public](http://localhost:8080/public) and you should see the home page.

To check unit tests, go to [http://localhost:8080/public/tests](http://localhost:8080/public/tests).

## Development

In development mode:

1. All main files are bundled together, including css (which is loaded by javascript). Page is completely obstrusive.
2. Development server overwrites ```css/syles.min.css``` for it not to be loaded twice (by html and javascript).
3. Webpack runs development server and watches for changes in all ```components/*``` files.
4. Webpack bundles files in memory, they are not written in disk during development.
5. Webpack reloads page after files are bundled.

To start development install dependencies and run:

```npm run dev```

This will:

1. Generate bundles from ```components/main``` (in memory only): ```main.min.js```, ```test.min.js```, ```styles.min.css``` and all lazy loaded bundles, like ```0.min.js```, ```1.min.js``` and so on...
2. Run an webpack dev server to serve files from memory.
3. Watch for changes in ```components/*``` folder.
4. Rerun bundles after original files (in ```components``` folder) are changed in disk.
5. Reload page after rerun.

After bundles are created and with server still running go to [http://localhost:8080/](http://localhost:8080/) and you should see the home page. Console will be logged with reload information.

To check unit tests, go to [http://localhost:8080/tests](http://localhost:8080/tests).

To check for linting errors in all javascript files, run ```npm run lint```.

## TO DO

1. Check why webpack is generating around 20 bundles when only a few are necessary.
2. Check angular ui-router nested states.
3. Check for file sizes.