const keyboard = [
  /**
   * @0
   */
  [
    { keys: ['ё', '`'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['1', '1'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['!', '!'] },
    { keys: ['2', '2'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['"', '@'] },
    { keys: ['3', '3'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['№', '#'] },
    { keys: ['4', '4'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: [';', '$'] },
    { keys: ['5', '5'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['%', '%'] },
    { keys: ['6', '6'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: [':', '^'] },
    { keys: ['7', '7'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['?', '&'] },
    { keys: ['8', '8'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['*', '*'] },
    { keys: ['9', '9'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['(', '('] },
    { keys: ['0', '0'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: [')', ')'] },
    { keys: ['-', '-'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['_', '_'] },
    { keys: ['=', '='], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['+', '+'] },
    { keys: ['Backspace', 'Backspace'], pressed: false, actived: false,   class: 'keyboard__backspace' },
  ],
  /**
   * @1
   */
  [
    { keys: ['Tab', 'Tab'], pressed: false, actived: false,   class: 'keyboard__tab' },
    { keys: ['й', 'q'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['ц', 'w'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['у', 'e'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['к', 'r'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['е', 't'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['н', 'y'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['г', 'u'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['ш', 'i'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['щ', 'o'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['з', 'p'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['х', '['], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['', '{'] },
    { keys: ['ъ', ']'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['', '}'] },
    { keys: ['Enter', 'Enter'], pressed: false, actived: false,   class: 'keyboard__enter' },
  
  ],
  /**
   * @2
   */
  [
    { keys: ['Caps Lock', 'Caps Lock'], pressed: false, actived: false,   class: 'keyboard__caps-lock' },
    { keys: ['ф', 'a'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['ы', 's'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['в', 'd'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['а', 'f'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['п', 'g'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['р', 'h'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['о', 'j'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['л', 'k'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['д', 'l'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['ж', ';'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['', ':'] },
    { keys: ['э', '\''], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['', '"'] },
    { keys: ['\\', '\\'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['/', '|'] },
    { keys: ['', ''], pressed: false, actived: false,   class: 'keyboard__default' },
  
  ],
  /**
   * @3
   */
  [
    { keys: ['Shift', 'Shift'], pressed: false, actived: false,   class: 'keyboard__shift' },
    { keys: ['я', 'z'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['ч', 'x'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['с', 'c'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['м', 'v'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['и', 'b'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['т', 'n'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['ь', 'm'], pressed: false, actived: false,   class: 'keyboard__default' },
    { keys: ['б', ','], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['', '<'] },
    { keys: ['ю', '.'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: ['', '>'] },
    { keys: ['.', '/'], pressed: false, actived: false,   class: 'keyboard__default', keys_2: [',', '?'] },
    { keys: ['Shift', 'Shift'], pressed: false, actived: false,   class: 'keyboard__shift' },
  ],
  /**
   * @4
   */
  [
    { keys: ['Ctrl', 'Ctrl'], pressed: false, actived: false,   class: 'keyboard__ctrl' },
    { keys: ['Win', 'Win'], pressed: false, actived: false,   class: 'keyboard__win' },
    { keys: ['Alt', 'Alt'], pressed: false, actived: false,   class: 'keyboard__alt' },
    { keys: ['Space', 'Space'], pressed: false, actived: false,   class: 'keyboard__space' },
    { keys: ['Alt', 'Alt'], pressed: false, actived: false,   class: 'keyboard__alt' },
    { keys: ['Win', 'Win'], pressed: false, actived: false,   class: 'keyboard__win' },
    { keys: ['Doc', 'Doc'], pressed: false, actived: false,   class: 'keyboard__doc' },
    { keys: ['Ctrl', 'Ctrl'], pressed: false, actived: false,   class: 'keyboard__ctrl' },
  ],
]

class KeyBoard {
  constructor (){
    this.$root = document.querySelector('.keyboard');
    this.$rows = document.querySelectorAll('.keyboard__row');
    this.keys = keyboard;
    this.local = 0;
    this.langs = { ru: 0, en: 1 }
    this.render();
  }
  render (){
    for(let i=0;i<5;i++){
      this.createRow(i);
    }
  }
  setLocal (local='ru'){
    this.local = this.langs[local];
    this.render();
    return this;
  }
  createBtn (key){
    const underKeys = `${key.keys_2?'<span class="keyboard__keys_2">'+key.keys_2[this.local]+'</span>':''}`;

    return  `<p class="keyboard__key ${key.class} ${key.pressed?'keyboard__pressed':''} ${key.actived?'keyboard__actived':''}">
                       ${key.keys_2?underKeys:''}
                                  
                       <span>${key.keys[this.local]}</span>
             </p>`
    
  }
  createRow (row){
      this.$rows[row].innerHTML = '';
      this.keys[row].map(key=>{
              const btn = this.createBtn(key);
              this.$rows[row].innerHTML +=btn;  
      });
  }
  /**
   * @param  {String} key    Символ на клавиатуре
   * @param  {Boolean} mode   Активировать или Нажать
   * @param  {String} active  Нажать / Отжать
   */
  selectButton (key,  mode, active){
      this.keys.map( (row, rowIndex)=>{
            row.map((btn, btnIndex)=>{
               const pressedKey = btn.keys.includes(key);
               if(pressedKey){
                  this.keys[rowIndex][btnIndex][mode] = active;
                  this.render();
               }
            })
      } )
  }
  resetActived (){
      this.keys.map( (row, rowIndex)=>{
            row.map((btn, btnIndex)=>{
                  this.keys[rowIndex][btnIndex]['actived'] = false;
            })
      })
      this.render();
  }

}

/**
 * Usage
 * const kb = new KeyBoard();
 * kb.selectButton ('л',  'actived', true)
 * kb.selectButton ('л', 'pressed', true)
 * kb.setLocal('en')
 * kb.resetActived()
 */

export default KeyBoard;
