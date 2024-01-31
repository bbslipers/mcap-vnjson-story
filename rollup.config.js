/**
 * rollup import files from js
 */
import styles           from 'rollup-plugin-styles';
import url              from '@rollup/plugin-url';
import files            from 'rollup-plugin-import-file';
import html             from 'rollup-plugin-html';
import yaml             from '@rollup/plugin-yaml';

/**
 * 
 */
import color            from 'ansi-colors';
import { babel }        from '@rollup/plugin-babel';
import scenesToJson     from 'scenes-to-json';
import chokidar         from 'chokidar';
import fse              from 'fs-extra';
import YAML             from 'yaml';
import watch            from "rollup-plugin-watch";
const config = YAML.parse(fse.readFileSync('./config.yaml', 'utf8'))

import packageConfig from './package.json'

const printVersion = () => {
  const str = `${color.gray('v'+packageConfig.version)} ${color.magenta(config.src)}`
  return str
}

const production = false;

export default {
  input: `${config.src}/main.js`,
  output: {
    file: `public/js/app.js`,
    name: 'app',
    format: 'iife',
    sourcemap: false
  },

  plugins: [
    yaml(),
    html(),
    styles(),
    url({
      fileName: '[hash][extname]',
      destDir: `./public/assets`
    }),
    files({
      output: `public/assets`,
      extensions: /\.(waw|ogg|mp3)$/,
      hash: false,
    }),
    babel({ 
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
      plugins: [
            ["babel-plugin-root-import", { "rootPathSuffix": `${config.src}`}]
      ]
    }),

    // watch
    watch({ dir: `${config.src}/plugins` }),


  ],

  watch: [
    `${config.src}/main.js`,
    `${config.src}/plugins.js`,
  ]
};


/**
 * socket
 */
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = config.port||9000;


/**
 * Собираем yaml - сцены
 */
const  buildScenes = () => {

  const src = `${config.src}/scenes`;
  const dist = `./public/scenes`;

  scenesToJson(src, dist, (err, sceneName, labelName)=>{
      console.clear()

      if(err){
          console.log( color.red(err.reason) );
          console.log( color.cyan(sceneName+'/'+ labelName) );
          console.log( color.magenta(`line ${ err.mark.line} column ${err.mark.column}`) );
          console.log( color.gray( err.mark.snippet) );
          io.emit('yaml-error', err, sceneName, labelName);
      }
      else{
        console.log(printVersion(), color.green( '[ Scenes has build ]' ) )
        io.emit('yaml-error', null);
      }
  })

}


chokidar.watch(`${config.src}/scenes`).on('change', (event, path) => {
    buildScenes()
})

buildScenes()

/**
 * copyStatic
 */
const copyStatic = () => {
   fse.copy(`${config.src}/static`, 'public')
}
copyStatic()
chokidar.watch(`${config.src}/static`).on('change', (event, path) => {
  copyStatic()

  io.emit('yaml-error', null)
})

/**
 * http-server
 */
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
})

http.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});


