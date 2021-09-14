export class Mouse{
    constructor(canvas){
            this.x = canvas.width / 2,
            this.y = canvas.height / 2,
            this.click = false,
            this.sTileID = -1,
            this.canvasPosition = canvas.getBoundingClientRect();
            this.canvas = canvas;
            this.setupListeners(canvas);
    }

    setupListeners(){
        let self = this;
        this.canvas.addEventListener('mousedown', function (event) {
            self.x = event.x - self.canvasPosition.left;
            self.y = event.y - self.canvasPosition.top;
            self.click = true;
        });
        this.canvas.addEventListener('mouseup', function (event) {
            self.click = false;
            self.sTileID = -1;
        });
        this.canvas.addEventListener('mousemove', function (event) {
            if (self.click) {
                self.x = event.x - self.canvasPosition.left;
                self.y = event.y - self.canvasPosition.top;
            }
        });
        this.canvas.addEventListener('mouseleave', function (event) {
            self.click = false;
            self.sTileID = -1;
        });
        this.canvas.addEventListener('mouseenter', function (event) {
            self.click = false;
            self.sTileID = -1;
        });

    }
    
}