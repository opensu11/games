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

    draw (ctx) {
        // console.log('drawing Button ');
        // draw the button body
        ctx.fillStyle = this.fillColor;
        ctx.fillRect (this.x, this.y, this.width, this.height);

        // draw the button text
        ctx.fillStyle = this.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '20px "Comic Sans MS"';
        ctx.fillText(this.text, (this.x + this.width/2), (this.y + this.height/2), this.width);
    }

    inBounds (mouseX, mouseY) {
        return !(mouseX < this.x || mouseX > (this.x + this.width) || 
            mouseY < this.y || mouseY > (this.y + this.height));
    }

    onClick (callStart) {
        callStart();
    }
}

module.exports = { 
    Button 
};