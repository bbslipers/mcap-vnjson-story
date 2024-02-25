export default class SritesAnimation {
    constructor(args) {
        this.id = args.id;
        this.className = `vnjson__sprites-animate-${this.id}`;
        this.src = vnjs.getAssetByName(args.name).url;
        this.delay = args.delay;
        this.width = +args.width.replace("px", "");
        this.height = +args.height.replace("px", "");
        this.top = args.top;
        this.left = args.left;
        this.cols = args.cols;
        this.rows = args.rows;
        this.loop = args.loop;
        this.x = 0;
        this.y = 0;
        this.canvas = null;
        this.ctx = null;
        this.currentFrame = 0;
        this.intervalID = null;
        this.img = null;
        this.n = 0;
        this.frameCol = 0;
        this.frameRow = 0;
        this.scale = args.scale || "unset";
        this.maxFrame = 0;
        this.create();
    }

    create() {
        this.canvas = document.createElement("canvas");
        this.canvas.classList.add(this.className);
        this.canvas.classList.add(`component`);

        vnjs.store.screen.get(0).append(this.canvas);

        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.display = "block";
        this.style();
    }
    remove() {
        clearInterval(this.intervalID);

        vnjs.emit("sprite-animation.end", this.id);
        this.canvas.remove();
    }
    style() {
        Object.assign(this.canvas.style, {
            top: this.top,
            left: this.left,
            transform: `scale(${this.scale})`,
        });
    }
    start() {
        this.loadImage();
    }
    loadImage() {
        this.img = new Image();
        this.img.onload = () => {
            this.startAnimate();
        };
        this.img.src = this.src;
    }

    startAnimate() {
        this.update();

        this.intervalID = setInterval(() => {
            this.update();
        }, this.delay);
    }

    draw() {
        //console.log(`frame: ${this.currentFrame+1}  / ${this.maxFrame}  col: ${this.frameCol+1} / ${this.cols} row: ${ this.frameRow+1} / ${this.rows}`)

        const origin = {
            w: this.frameCol * this.width,
            h: this.frameRow * this.height,
            x: this.width,
            y: this.height,
        };

        const frame = {
            w: this.width,
            h: this.height,
            x: 0,
            y: 0,
        };

        this.ctx.drawImage(
            this.img,
            origin.w,
            origin.h,
            this.width,
            this.height,
            frame.x,
            frame.y,
            frame.w,
            frame.h
        );
    }

    update() {
        this.frameCol = this.currentFrame % this.cols;
        this.frameRow = Math.floor(this.currentFrame / this.cols);
        this.maxFrame = this.cols * this.rows - 1;

        if (this.currentFrame > this.maxFrame) {
            this.currentFrame = 0;
 
            this.onLoop();
        } 
        else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw();
            this.currentFrame++;
        }
    }
    onLoop() {
        vnjs.emit("sprite-animation.loop", this.id, this.n);

        if (this.loop === true) {
            /***/
        } else if (typeof this.loop === "number") {
            console.log(this.n, this.loop)
            if(this.n===this.loop-1){
               
                this.remove();
             
            }
            else{
                this.n++
            }
           
            //this.repeat(this.loop);
        } else {
            this.remove();
        }
    }
 
}

