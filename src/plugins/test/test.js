
class Test {
    pause = 0;
    qIndex = 0;
    answers = [];
    click = true;
    constructor ($tpl){
        this.$tpl = $tpl;
    }
    start (args){
        $('.vnjson__test-result').hide();
        $('.vnjson__test-wrapper').show();

        this.reset();
        this.$tpl.show();
        this.args = args;
        this.renderQuetion();
    }
    reset() {
        this.qIndex = 0;
        this.answers = [];
        vnjs.state.data.trueAnswer = 0;
        vnjs.state.data.falseAnswer = 0;
        vnjs.state.data.summTest = 0;
        vnjs.state.data.textTest = "";
        vnjs.state.data.imgTest = null;

        $(".vnjson__test").css("background-color", "wheat");
        $(".vnjson__variants-item").css("background-color", "unset");
        $(".vnjson__test-next-btn").css("background-color", "black");
        $(".vnjson__variants-item_success").css("background-color", "unset");
        $(".vnjson__variants-item_fail").css("background-color", "unset");
        $(".vnjson__test-result").css("background-color", "wheat");
    }
    applyStyles() {
        $(".vnjson__test").css("background-color", this.args["color-background"]);
        $(".vnjson__variants-item").css("background-color", this.args["color-item"]);
        $(".vnjson__test-next-btn").css("background-color", this.args["color-item"]);
        $(".vnjson__variants-item_success").css(
            "background-color",
            this.args["color-item-correct"]
        );
        $(".vnjson__variants-item_fail").css(
            "background-color",
            this.args["color-item-incorrect"]
        );
        $(".vnjson__test-result").css("background-color", this.args["color-result"]);
    }
    renderQuetion() {
        this._quetionItem = this.args.questions[this.qIndex];
    
        $(".vnjson__test-name").html(this.args.name);
        const $imageContaner = $(".vnjson__test-quetion-img");

        if (this._quetionItem?.reply) {  
            $(".dialog-box__reply").html(this._quetionItem.reply);
        }

        if (this._quetionItem?.audio) {
            vnjs.emit("audio", this._quetionItem.audio);
        }

        $(".vnjson__test-variants").html("");
    
        if (this._quetionItem.image) {
            const url = vnjs.getAssetByName(this._quetionItem.image).url;
            $imageContaner.attr("src", url).show();
        } else {
            $imageContaner.hide();
        }
    
        $(".vnjson__test-quetion-val").html(this._quetionItem.question);
    
        this._quetionItem.variants.map((item, index) => {
            const $tplItem = $(`<div class="vnjson__variants-item" data-index="${index}"></div>`);
            if (typeof item === "object") {
                for(let key in item){
                    $tplItem.attr('data-point', item[key]);
                    $tplItem.html(key);
                }
            }
            else{
              $tplItem.html(item);
            }
            $(".vnjson__test-variants").append($tplItem);
        });
        this.applyStyles();
    }
    nextStep() {
        let timer =
            typeof this.args["self-control"] === "number" ? this.args["self-control"] : 2000;
        timer = timer + this.pause;
        this.sleep = 0;
        if(!this.args["self-control"]){
            timer = 300;
        }
        setTimeout(() => {
            this.click = true;
            ++this.qIndex;
            if (this.qIndex === this.args.questions.length) {
                this.onEnd()                
            } else {
                this.renderQuetion();
            }
        }, timer);
    }
    
    onEnd(){
      if(this.args.onEnd){
        vnjs.exec(this.args.onEnd);
      }
      if(this.args.result===false){
        vnjs.exec({
            test: false,
            next: true
        })
        return
      }

      $('.vnjson__test-wrapper').hide();
      $('.vnjson__test-result').css('display', 'flex');

      const { 
            imgTest, 
            textTest,
            summTest,
            trueAnswer,
            falseAnswer
      } = vnjs.state.data;

      if(imgTest){
        const url = vnjs.getAssetByName(imgTest).url;
        $('.vnjson__test-result-image').attr('src', url).show();
      }else{
        $('.vnjson__test-result-image').hide();
      }

      if(textTest){
        $('.vnjson__test-textTest').show().html(textTest);
      }else{
        $('.vnjson__test-textTest').hide().empty();
      }
      
      if(this.args.type==='SummText'){
        $('.vnjson__test-result-TrueFalse').hide();
        if(summTest==='false'){
            $('.vnjson__test-result-SummTest').hide()
           return
        }else{
            $('.vnjson__test-result-SummTest').show();
            $('.vnjson__test-SummTest-value').html(vnjs.state.data.summTest);
        }
      }
      
      if(this.args.type==='TrueFalse'){
        $('.vnjson__test-result-SummTest').hide();
        if(trueAnswer||falseAnswer){
            $('.vnjson__test-result-TrueFalse').show();
            $(".vnjson__test-result-item_true").html(trueAnswer);
            $(".vnjson__test-result-item_false").html(falseAnswer);
        }else{
            $('.vnjson__test-result-TrueFalse').hide()
        }
      }

      $(".vnjson__test-result").show();
      vnjs.state.data.summTest = 0;
    }
    clickItem ($node){
        const index = $($node).data("index");
        const point = $($node).data("point");
        if(point){
            vnjs.state.data.summTest = vnjs.state.data.summTest + point;
        }
        if (this.click) {
            if (index === this._quetionItem.correct - 1) {
                if (this.args["self-control"]) {
                    $($node).addClass("vnjson__variants-item_success");
                }
                ++vnjs.state.data.trueAnswer;
                this.answers.push({ answer: true, quetion: this._quetionItem });
                if (this._quetionItem?.right) {  
                    $(".dialog-box__reply").html(this._quetionItem.right);
                }
            } else {
                if (this.args["self-control"]) {
                    $($node).addClass("vnjson__variants-item_fail");
                    $(".vnjson__variants-item")
                        .toArray()
                        .map((item) => {
                            if ($(item).data("index") === this.args.questions[this.qIndex].correct - 1) {
                                $(item).addClass( "vnjson__variants-item_success");
                            }
                        });
                    this.applyStyles();
                }
                ++vnjs.state.data.falseAnswer;
                this.answers.push({ answer: false, quetion: this._quetionItem });    
                if (this._quetionItem?.wrong) {
                    $(".dialog-box__reply").html(this._quetionItem.wrong);   
                }
            }
            if (this._quetionItem?.pause) {
                this.pause = this._quetionItem.pause;
            }
            this.click = false;
            this.applyStyles();
            this.nextStep();
        }
    }
}

export default Test;