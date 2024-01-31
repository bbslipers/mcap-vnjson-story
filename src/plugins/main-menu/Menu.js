class Menu {
    items = []
    itemClickParam = null
    audio = null
    constructor ($view, vnjs, config){
        this.$view = $view
        this.__vnjs = vnjs
        this.itemQuetionClassName = config.itemQuetionClassName
        this.itemClassName = config.itemClassName
    }
    setData (param){
        this.reset()
        this.items = param
        this.items.forEach(menuItem => {
            const item = this.prepareMenuItem(menuItem)
            this.createMenuItem(item)
        })
    }
    show (){
        this.$view.show()
    }
    hide (){
        this.$view.hide()
    }
    prepareMenuItem (menuItem){
        const objData = {}
        for(let _key in menuItem){
            let key = _key
            /**
             * Определяем есть ли среди параметров меню ID персонажа
             * Если есть, то вопрос от имени персонажа встраиваем в меню
             */
            const character = this.__vnjs.getCharacterById(_key)
            if(character){
                key = 'character'
            }
            const value = menuItem[_key]
            switch (key){
                    case 'disabled':
                        objData.disabled = value
                        break
                    case 'character':
                        objData.character = { character, value }
                        break
                    case 'onClick':
                        objData.onClick = value
                        break
                    case 'icon':
                         objData.icon = value
                        break
                    case 'info':
                         objData.info = value
                        break
                    case 'css':
                        objData.css = value
                        break
                    /**
                     * ROUTE
                     */    
                    default:
                        objData.route = { path: key, value }    
            }

        }
        return objData
    }
    getIconTpl (value){
        const icon = this.__vnjs.getAssetByName(value).url
        return `<img alt="" class="menu-item__icon" src="${icon}"/>`
    }
    createMenuItem (item){
        let tpl = null
        if(item.character){
            const { character, value } = item.character
            tpl = `<div class="${this.itemQuetionClassName}">
                        <span style='color:${character.nameColor}; padding-right: 20px;'>${ character.name }:</span>
                        <span style='color:${character.replyColor}; '>${ value }</span>
                   </div>`;
        }
        if(item.route){
                tpl = `<div data-label="${ item.route.path }" class="${this.itemClassName} ${item.disabled?'disabled':''}">
                            ${item.icon?this.getIconTpl(item.icon):''}
                            <div class="main-menu__item-wrapper">
                                <span class="main-menu__item-text">${ item.route.value }</span>
                                ${item.info?`<div class="main-menu__item-info">${item.info}</div>`:''}
                            </div>
                            
                            
                      </div>`;
        } 

        if(item.css){
            this.$view.css(item.css)
        }
        if(item.onClick){
            this.itemClickParam = item.onClick
        }


        this.$view.append(tpl)
  
    }

 
    clickItemHundler (label){
        this.hide()
        if(label==='next'){
            setTimeout(() => {
                vnjs.exec({ next: true })
            }, 0)
        }
        else{
            if(this.itemClickParam){
                vnjs.exec(this.itemClickParam)
            }
            setTimeout(() => {
                vnjs.exec({ jump: label })
            }, 0)
        }
        if(this.audio){
            this.audio.play()
        }
   
        
    }
    reset (){
        this.$view.empty()
        this.itemClickParam = false
    }

}

export default Menu