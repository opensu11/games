class Button {

    constructor (text, fillColor, textColor) {
        this.text = text;
        this.fillColor = fillColor;
        this.textColor = textColor;
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }

    setSize (width, height) {
        this.width = width;
        this.height = height;
    }

    activate () {
        this.active = true;
    }

    deactivate () {
        this.active = false;
    }

    draw (ctx) {
        // console.log('drawing Button ');
        // draw the button body

        // // First version
        // let grd = ctx.createRadialGradient (50, 60, 20, 50, 70, 100);
        // grd.addColorStop (0, 'orange');
        // grd.addColorStop (1, 'white');

        // console.log('grd ', grd);

        // ctx.fillStyle = grd;

        ctx.fillStyle = this.fillColor;
        ctx.beginPath ();

        // ctx.roundRect (this.x, this.y, this.width, this.height, 5);
        // console.log('x, .. ', this.x, this.y, this.width, this.height);
        ctx.fillRect (this.x, this.y, this.width, this.height);
        ctx.stroke ();
        // console.log ('after stroke');

        // draw the button text
        ctx.fillStyle = this.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '20px "Comic Sans MS"';
        ctx.fillText(this.text, (this.x + this.width/2), (this.y + this.height/2 + 3), this.width);



        // // Second version
        // let grd = ctx.createRadialGradient (30, 50, 2, 90, 120, 100);
        // grd.addColorStop (0, 'blue');
        // grd.addColorStop (1, 'white');

        // ctx.fillStyle = grd;
        // // ctx.fillRect (0, 0, 50, 50);
        // // ctx.roundRect (0, 0, 100, 100, 5);
        // ctx.fillRect (100, 100, 20, 20);
    }

    clear (ctx) {
        ctx.clearRect (this.x, this.y, this.width, this.height);
    }

    inBounds (mouseX, mouseY) {
        if (this. active) {
            return !(mouseX < this.x || mouseX > (this.x + this.width) ||
            mouseY < this.y || mouseY > (this.y + this.height));
        }
    }

    onClick (callStart) {
        if (this.active) {
            callStart(this.text);
        }
    }
}

module.exports = {
    Button
};