
// https://zimjs.org/skool/lesson07.html
  
const scaling = "zim_1"; // id должно совпадать с именем файла
const width = 1024; // ширина сцены
const height = 568; // высота сцены
const outerColor = dark; // цвет снаружи кадра [green, blue, pink, faint, clear, "#333"]      
const innerColor = light; // цвет внутри кадра [green, blue, pink, faint, clearб "#333"]

const align = CENTER; // LEFT, CENTER, RIGHT
const valign = CENTER; // LEFT, CENTER, RIGHT
const canvasID = "сanvas_zim_1";

const path = "scenes/assets/"; // путь к ресурсам
const assets = [
  "zimjs-logo.png",
  {assets:["kolokol.ogg"]},
  {font: "minecraft", src:"minecraft.ttf"},  
  {id:"zimjs-zlogo", src:"zimjs-zlogo.webp"},
];

const frame = new Frame(scaling, width, height, innerColor, outerColor, ready, assets, path, null, null, true, true, false, align, valign, canvasID);

function ready() {
  // Автоматически создаются глобальные переменные F (frame), S (stage), W (width), H (height)
  
  const kl = new Aud("kolokol.ogg"); // звук колокола из ресурсов
  const bg = new Pic("zimjs-logo.png").center(); // вставка изображения по центру
  const title = new Label({text:"Minecraft", font:"minecraft"}).loc(70, 34); // вставка заголовка (текст особым шрифтом)
  
  const z1 = new Pic("zimjs-zlogo").loc(10, 10); // вставка изображения со смещением
  z1.width = 50; // изменение размера [width, height, widthOnly, heightOnly]
  z1.draggable = true; // включение свободного позиционирования
  z1.on("pressup", ()=>{
    kl.play();
  });
  
  const z2 = new Pic("zimjs-zlogo").addTo();
  z2.width = 50; z2.x = 1024-60; z2.y = 10;
  z2.on("click", ()=>{
    kl.play();
  });
  
  // makeIcon(type, color, scale)
  // play, stop, pause, restart, rewind, fastforward, sound, mute, close, settings, menu, maximize
  // arrow, arrowthin, arrowstick, arrowhollow, arrowline, rotate, heart, marker, info, home, edit, magnify, checkmark
  const icon = pizzazz.makeIcon("checkmark", red, 2).center();
  
  // Автоматически выполняется S.update()
};
