import KeyBoard from './KeyBoard.js';

class TypeWrite {
  constructor (){
    this.kb = new KeyBoard();
    this.key;
    this.task;
    this.activeColor = 'green';
    this.maxLetters = 44;
    this.currentArray = [];
    this.currentString = '';
    this.taskIndex = 0;
    this.characterIndex = 0;
    this.errors = 0;
    this.prevUserString = '';
    this.view = {
      task: document.querySelector('.typewrite__task'),
      textarea: document.querySelector('.typewrite__textarea'),
    }
    this.init();
  }
  init (){
    this.view.textarea.addEventListener('input', this.keyBoardHandler.bind(this));
  }
  setTask (task){
    setTimeout(()=>{
      this.view.textarea.focus();
    },100)
    this.task = [].concat(task);
    this.setString();
  }
  setString (){
    this.currentArray = this.getSplittedTask();
    this.currentString = this.getJoinedTask();
    this.print();
  }
  print (){
    this.view.task.innerHTML = this.currentString;
  }
  /**
   * Берем задание, получаем текущее и разбиваем его на отдельные символы
   */
  getSplittedTask (){
    return this.task[this.taskIndex].split('').slice(0, this.maxLetters);
  }
  /**
   * Пробегаемся по полученному массиву символов и заворачиваем каждый символ в html тег
   */
  getJoinedTask (){
    return this.getSplittedTask()
               .map(key=>{
                     return `<span class="typewrite__character" data-active="false" data-key="${key}">${key}</span>`
               })
               .join('')
  }
  getTaskCharacter (){
    return this.currentArray[this.characterIndex];
  }
  /**
   * Обработчик события @input элемента <textarea>
   * Нет возможности использовать addEventListener('keydown')
   * Так как это событие не работает в плагине для Майнкрафт WebDispalay
   */
  keyBoardHandler (event){
    this.key = event.data;
    this.event = event;
    /**
     * Обработка нажатия клавиши [ backspace ] [ del]
     */
    if(event.inputType.includes('deleteContent')){
      this.view.textarea.value = this.prevUserString;
      return;
    }
    /**
     * Что бы ползователь не мог произвольно нажимать Enter
     * и создавать ещё строки внутри <textarea> Я отрезаю от текущей строки символ
     * переноса строки
     * Элемент <input> не генерирует событие Enter потому что, у него поведение по умолчанию
     * не предусматривает перенос строки.
     */
    if(!event.data&&!this.isEndString()) {
      this.view.textarea.value = this.view.textarea.value.trim();
      return;
    };
    /**
     * Если в конце строки, произошло нажатие лубой клавиши
     * кроме [Enter]
     */
    if(event.data&&this.isEndString()){
      this.view.textarea.value = this.prevUserString
      return;
    };
    /**
     * Обработка нажатия Enter в конце строки
     */
    if(!event.data&&this.isEndString()) {
      this.view.textarea.value = this.view.textarea.value.trim()
      //console.log('end str')
      this.next();
      return;
    }

    /**
     * Неправильный символ
     */
    if(this.getTaskCharacter()!==this.key){
      this.onInvalidCharacter();
      return;
    }
    /**
     * Правильный символ
     */
    if(this.getTaskCharacter()===this.key){
        this.onValidCharater();
        return;
    }
  }
  /**
   * Когда происходит ввод символов в <textarea> по порядку
   * Происходит активирование правильных символов.
   * Если после правильного символа ввести неправильный, а следом снова правильный.
   * То в строке где отображаются правильные символы будет подсвечен следующий символ.
   * Несмотря на то, что в <textarea> символов больше. Между двумя правильными символами
   * можно напихать неправильных. При том пользователь увидет, что символы напечатаны правильно.
   * Но в <textarea> будут видны лишние напечатанные символы
   */
  checkingIndexesMatching (){
    return this.getActiveCharacters().length === this.view.textarea.value.length-1;
  }
  /**
   * Пользователь ошибся при вводе символа
   */
  onInvalidCharacter (){
    this.errors ++;
    this.selectNextButton(true);
  }
  /**
   * Пользователь ввёл корректный символ
   */
  onValidCharater (){
    this.selectNextButton(false);
    /*
     * Проверяю есть ли в <textarea> между двух правильных символов неправильные
     */
    if(!this.checkingIndexesMatching() ) return;
    // Получаю текущий актиный символ завернутый в тег
    const charNode = this.getTaskCharacterTags()[this.characterIndex];
    this.prevUserString = this.view.textarea.value;
    // Маркирую текущий символ как активированный.
    charNode.setAttribute('data-active', true);
    charNode.style.color = this.activeColor;
    // Увеличиваю индекс, что бы работать со следующим символом
    this.characterIndex++;
  }
  getTaskCharacterTags (){
    return document.querySelectorAll('.typewrite__character')
  }
  getUserIndex (){
    return this.view.textarea.value.length-1;
  }
  isEndString (){
    return this.getSplittedTask().length===this.getUserIndex();
  }
  getActiveCharacters (){
    return document.querySelectorAll('.typewrite__character[data-active="true"]')
  }
  resetString (){
    this.characterIndex = 0;
    this.view.textarea.value = '';
    this.prevUserString = '';

  }
  resetTask (){
    this.errors = 0;
    this.view.task.innerHTML = '';
    this.taskIndex = 0;
  }
  next (){
    if(this.task.length-1===this.taskIndex){
      this.resetString();
      this.resetTask();
      if(!this.endCallback) return;
      this.endCallback();
      return;
    }
    this.taskIndex++;
    this.resetString();
    this.setString();
  }
  onEnd (endCallback){
    this.endCallback = endCallback;
  }
  setActiveColor (color='lightblue'){
    this.activeColor = color;
  }
  selectNextButton (errorFlag){
    const nextBtn = this.currentArray[this.characterIndex]
    this.kb.selectButton (nextBtn, 'pressed', errorFlag)

  }
  /*
   time
   errors
   progress
   */
}

export default TypeWrite;