class Content {
    data = null;    
    open = false;
    constructor (vnjs, $view){
        this.__vnjs = vnjs;
        this.$view = $view;
    }
    getData (){
        const {sceneName} = this.__vnjs.state;
        const currentContent = this.__vnjs.tree[sceneName].content;
        if(currentContent){
            return currentContent;
        }
        const globalContent = this.__vnjs.tree.$root.content;
        if(globalContent){
            return globalContent;
        }
    }
    reset (){
        this.$view.empty();
    }
    show (){     
        this.$view.show();
        this.open = true;
    }
    hide (){
        this.$view.hide();
        this.open = false;
    }
    render (){
        this.reset();
        this.data = this.getData();
        this.data.forEach( (item, parentIndex) => {
            const $parent = $(`<li class="stage-parent state-parent-${ parentIndex}"><div class="stage-vol stage-item"></div><ul class="stage-children"></ul></li>`);

            if(item.disabled){ 
                this.disabled(item.disabled, $parent);
            }

            if(item.children){
                item.children.forEach( (child, childIndex) => {
                    const $str = $(`<li class="stage-child stage-child-${childIndex} stage-item"><li>`)
                        if(child.disabled){
                            this.disabled(child.disabled, $str)
                        }
                        const childRoute = Object.keys(child).filter( obj => {
                            if(obj!=='disabled'&&obj!=='children') return true
                        })
                        $str.attr('data-label', childRoute).html(child[childRoute])
                        $parent.find('ul').append($str)
                    })
            }

            const parentRoute = Object.keys(item).filter( obj => {
                if(obj!=='disabled'&&obj!=='children'){
                    return true;
                }
            })
            $parent.find('.stage-vol.stage-item').attr('data-label', parentRoute).html(item[parentRoute]);
            this.$view.append($parent);
        })
    }

    switchItem (data){
        const level = String(data.item).split(' ')
        if(level.length===1){
            this.__vnjs.tree.$root.content[level[0]].disabled = data.disabled;
        }
        if(level.length===2){
            this.__vnjs.tree.$root.content[level[0]].children[level[1]].disabled = data.disabled;
        }
    }

    selectItem (label) {    
        if(!this.__vnjs.isRouteExist(label)){
            return;
        }else{
            this.hide();
            this.__vnjs.exec({jump: label });
        }
    }

    disabled (obj, $node){
        if(typeof obj ==='object'){
            for(let key in obj){                 
                const value = this.__vnjs.state.data[key];             
                if(Array.isArray(obj[key])){
                    const [ min, max ] = obj[key];
                    if( min <= value && value <= max ){
                        $node.addClass('disabled');
                    }
                }
                if(typeof obj[key]==='string'){
                    if(obj[key]===value){
                        $node.addClass('disabled');
                    }
                }
            }
        }else{
            $node.addClass('disabled');
        }
    }
}

export default Content