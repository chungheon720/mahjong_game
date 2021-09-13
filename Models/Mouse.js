export class Mouse{
    constructor(canvas){
            this.x = canvas.width / 2,
            this.y = canvas.height / 2,
            this.click = false,
            this.sTileID = -1,
            this.canvasPosition = canvas.getBoundingClientRect();
    }

    setupListeners(canvas){
        canvas.addEventListener('mousedown', function (event) {
            this.x = event.x - canvasPosition.left;
            this.y = event.y - canvasPosition.top;
            this.click = true;
        });
        canvas.addEventListener('mouseup', function (event) {
            this.click = false;
            this.selectedTile = -1;
        });
        canvas.addEventListener('mousemove', function (event) {
            if (this.click) {
                this.x = event.x - canvasPosition.left;
                this.y = event.y - canvasPosition.top;
            }
        });
        canvas.addEventListener('mouseleave', function (event) {
            this.click = false;
            this.selectedTile = -1;
        });
        canvas.addEventListener('mouseenter', function (event) {
            this.click = false;
            this.selectedTile = -1;
        });
    }
}