import './theme.css'

// Встроенные:
// log, jump, next, timeout

import assetsLoader from "./plugins/$assets-loader/index.js";
import discordLogger from "./plugins/$discord-logger/index.js";
import fontFamilyLoader from "./plugins/$font-family-loader/index.js";

import screen from "./plugins/screen/index.js";
import dialogBox from "./plugins/dialog-box/index.js";
import dialogBoxInfo from "./plugins/dialog-box-info/index.js";

import clear from "./plugins/clear/index.js";
import scene from "./plugins/scene/index.js";

import hud from "./plugins/hud/index.js";
import hands from "./plugins/hands/index.js";
import handsVoice from "./plugins/hands-voice/index.js";
import handsContent from "./plugins/hands-content/index.js";

import vnjsonSwitch from "./plugins/vnjson-switch/index.js";
import vnjsonExecute from "./plugins/vnjson-execute/index.js";
import vnjsonInterval from './plugins/vnjson-interval/index.js';

import data from "./plugins/data/index.js";
import dataGet from './plugins/data-get/index.js';
import dataInput from "./plugins/data-input/index.js";

import show from "./plugins/show/index.js";
import showArea from "./plugins/show-area/index.js";
import showBlock from "./plugins/show-block/index.js";
import showFrame from './plugins/show-frame/index.js';
import showImage from "./plugins/show-image/index.js";
import showSlide from "./plugins/show-slide/index.js";
import showTable from "./plugins/show-table/index.js";
import showXterm from "./plugins/show-xterm/index.js";

// ============================================================================

import playVideo from "./plugins/play-video/index.js";
import playAudio from "./plugins/play-audio/index.js";
import playZimjs from './plugins/play-zimjs/index.js';

import html from "./plugins/html/index.js";
import menu from "./plugins/menu/index.js";
import mainMenu from "./plugins/main-menu/index.js";

import test from "./plugins/test/index.js";
import dragItems from './plugins/drag-items/index.js';
import selectWord from './plugins/select-word/index.js';

import mcGet from "./plugins/mc-get/index.js";
import mcExec from "./plugins/mc-exec/index.js";
import mcCheck from "./plugins/mc-check/index.js";

vnjs.use(assetsLoader);
vnjs.use(discordLogger);
vnjs.use(fontFamilyLoader);

vnjs.use(screen);
vnjs.use(dialogBox);
vnjs.use(dialogBoxInfo);

vnjs.use(clear);
vnjs.use(scene);

vnjs.use(hud);
vnjs.use(hands);
vnjs.use(handsVoice);
vnjs.use(handsContent);

vnjs.use(vnjsonSwitch);
vnjs.use(vnjsonExecute);
vnjs.use(vnjsonInterval);

vnjs.use(data);
vnjs.use(dataGet);
vnjs.use(dataInput);

vnjs.use(show);
vnjs.use(showArea);
vnjs.use(showBlock);
vnjs.use(showFrame);
vnjs.use(showImage);
vnjs.use(showSlide);
vnjs.use(showTable);
vnjs.use(showXterm);

// ============================================================================

vnjs.use(playVideo);
vnjs.use(playAudio);
vnjs.use(playZimjs);

vnjs.use(html);
vnjs.use(menu);
vnjs.use(mainMenu);

vnjs.use(test);
vnjs.use(dragItems);
vnjs.use(selectWord);

vnjs.use(mcGet);
vnjs.use(mcExec);
vnjs.use(mcCheck);

// Load scenes
//function showError (err){
//  const $errorWindow =  $(".debug-error");
//  $errorWindow.show();
//  const $errorMessageContainer = $errorWindow.find(".debug-error__msg")
//  const yamlError = vnjs._loadError();
//  if(yamlError){
//    $errorMessageContainer.html(yamlError.msg);
//    $errorWindow.find('.debug-error__pos').html(yamlError.pos);
//    $errorWindow.find('.debug-error__path').html(yamlError.path);
//    $errorWindow.find('.debug-error__code').html(yamlError.snippet);
//  }else{   
//    $errorMessageContainer.html("Невалидный скрипт " +  err.message);
//  }
//}

fetch(`scenes/vn.json?v=${new Date().getTime()}`)
  .then((r) => r.json())
  .then((tree) => {
    vnjs.mount(tree)
//    if (tree.$root.package.debug) {
//      vnjs.use(debug);
//      vnjs.use(debugUtils);
//      }
  })
  .catch((err) => {
    console.error("Invalid script", err.message);
  });

vnjs.on("postload", function () {
  vnjs.config = {
    width: 1024,
    height: 768,
    debug: vnjs.package.debug,    
  };

  try {
    window.mcefQuery({
      request: "info",
      persistent: true,
      onSuccess: response=>{
        vnjs.state.data.player = JSON.parse(response);
        vnjs.emit('player-load', vnjs.state.data.player.name);
      }
    })
  } catch (err) {
    vnjs.state.data.player = {
      name: vnjs.package.player.name,
      uuid: vnjs.package.player.uuid
    }
    vnjs.emit('player-load', vnjs.state.data.player.name);
  }

  // Обработка перехода по URL
  // http://localhost:9000?jump=$root.$init
  const label = new URL(location.href).searchParams.get("jump");
  if (label) {
    const [sceneName, labelName] = label.split(".");
    vnjs.exec({ jump: `${sceneName}.${labelName}` });
  } else {
    vnjs.exec({ jump: "$root.$init" });
  }
});