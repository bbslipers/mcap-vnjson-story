export default{
    'scene': false,
    'left': false,
    'center': false,
    'right': false,
    'leftimg': `name: null
css:
  width: 200px
  height: 200px
  top: 0px
  left: 0px`,
    'centerimg': `name: null
css:
  width: 200px
  height: 200px
  top: 0px
  left: 0px`,
    'rightimg': `name: null
css:
  width: 200px
  height: 200px
  top: 0px
  left: 0px`,
    'audio': `name: null
action: play
speed: 1
volume: 1
loop: true`,
'blocks': `- id: null
  image: null
  z-index: 0
  timeout: 0
  width: 100px
  height: 100px
  top: 100px
  left: 100px
  animation: 
    type: showLeft
    duration: 1000`,
  'blocks-step': `id: null
image: null
z-index: 0
animation: 
  type: moveTo
  duration: 2000
  left: 300px
  top: 300px`,
  'audio-sprite': `name: null
volume: 1
sprite:
  sound_1:
    - 1:08
    - 0:06
  sound_2: 
    - 2:05
    - 0:03`,
    /**
     * CHARACTER
     */
  'character': `reply: null
avatar: null
info: null
borderColor: "#57f704"`,
  /**
   * MENU
   */
  'menu': `- $init: Начало
  icon: p1
- $root.$init: Начало 2
- next: Продолжить`,
/**
 * VIDEO
 */
  'video': `name: null
volume: 0.7
css:
  top: 50px
  left: 50px
  width: 500px
  height: 300px`,
  /**
   * execute
   */
  'execute': `- ...
- ...`,
  /**
   * DEV
   */
  'img-size': "null",
/**
 * minecraft cmd
 */  
  'cmd-player': `executeCMD
give @p dirt 1`,
  'cmd-server': `executeCMD
say TEST`,
  'cmd-mc-get': `request: PLAYER #BLOCK #SLOT #ENTITY
slot: 0
pos: "0 0 0"`,
/**
 * DATA
 */
  'data': "true",
  
}



