const routeError = {
    en: `Plugin  <font color="deepskyblue">content</font> leads nowhere`,
    ru: `Некоректные параметры плагина <font color="deepskyblue">content</font>. Маршрут не найден`
}

class Content {
    open = false
    data = null
    constructor (vnjs, $view){
        this.__vnjs = vnjs
        this.$view = $view
    }
    getData (){
        const { sceneName } = this.__vnjs.state
        const currentContent = this.__vnjs.tree[sceneName].content
        if(currentContent){
            return currentContent
        }
        const globalontent = this.__vnjs.tree.$root.content
        if(globalontent){
            return globalontent
        }
        else{
            this.__vnjs.emit('error', {
                en: `File <font color="cyan">$root/content.yaml</font> is missing`,
                ru: `Файл <font color="cyan">$root/content.yaml</font> отсутсвует`
            })
        }
 
    }
    reset (){
        this.$view.empty()
    }
    show (){     
        this.$view.show()
        this.open = true
    }
    hide (){
        this.$view.hide()
        this.open = false
    }
    render (){
        this.reset()
        this.data = this.getData()
     
        this.data.forEach( (item, parentIndex) => {
            const $parent = $(`<li class="stage-parent state-parent-${ parentIndex}"><div class="stage-vol stage-item"></div><ul class="stage-children"></ul></li>`)
            /**
             * disabled
             */

            if(item.disabled){ 
                this.disabled(item.disabled, $parent)
            }

            /**
             * children
             */
            if(item.children){
                    item.children.forEach( (child, childIndex) => {
                        const $str = $(`<li class="stage-child stage-child-${childIndex} stage-item"><li>`)
                        if(child.disabled){
                            this.disabled(child.disabled, $str)
                        }
                        /*
                        * children route
                        */
                        const childRoute = Object.keys(child).filter( obj => {
                            if(obj!=='disabled'&&obj!=='children') return true
                        })
                        $str.attr('data-label', childRoute).html(child[childRoute])
                        $parent.find('ul').append($str)
                    })
            }
            /**
             * route
             */
            const parentRoute = Object.keys(item).filter( obj => {
                if(obj!=='disabled'&&obj!=='children') return true
            })

            $parent.find('.stage-vol.stage-item').attr('data-label', parentRoute).html(item[parentRoute])
           
            this.$view.append($parent)

        })
    }
    /**
     * disabled = !disabled
     */
    switchItem (data){
        const level = String(data.item).split(' ')


        if(level.length===1){
            this.__vnjs.tree.$root.content[level[0]].disabled = data.disabled
        }
        if(level.length===2){
            this.__vnjs.tree.$root.content[level[0]].children[level[1]].disabled = data.disabled
        }

        
    }

    selectItem (label) {
    
        if(!this.__vnjs.isRouteExist(label)){
            this.__vnjs.emit('error', routeError)
            return
        }
        else{
            this.hide()
            this.__vnjs.exec({jump: label })
        }
    }
    disabled (obj, $node){
        if(typeof obj ==='object'){
            for(let key in obj){
                const _data = this.__vnjs.state.data[key]
      
                const [ min, max ] = obj[key]
                if( Array.isArray( obj[key] ) ){
                    if( min<=_data&&_data<=max ){
                        $node.addClass('disabled')
                    }
                }
                if(typeof obj[key] === 'string'){
                    if(obj[key]===_data){
                        $node.addClass('disabled')
                    }
                }

            }

        }
        else{
            $node.addClass('disabled')
        }
    }
}





export default Content