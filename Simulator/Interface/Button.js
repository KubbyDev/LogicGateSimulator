class Button {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 80;
        this.height = 50;
        this.name = "";
        this.color = "#000000";
        this.fontSize = 14;
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    /*** Changes the code to execute when this button is pressed */
    setOnClick(onClick) {
        this.onClick = onClick;
        return this;
    }

    onClick() {
    }

    // Graphical properties --------------------------------------------------------------------------------------------

    setGraphicProperties(width, height, name,color) {

        this.width = width;
        this.height = height;
        this.name = name;
        this.color = color;
        return this;
    }

    draw() {

        // Borders
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);

        // Middle
        ctx.fillStyle = Interface.BACKGROUND_COLOR;
        ctx.fillRect(
            this.x - this.width/2 + this.width/15,
            this.y - this.height/2 + this.height/15,
            this.width - 2*this.width/15,
            this.height - 2*this.height/15
        );

        this.drawCenter();
    }

    /*** Draws something in the center of the button
     * Can be overriden for custom behaviour */
    drawCenter() {
        this.drawName();
    }

    drawName() {
        // Name
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = this.fontSize + "px Arial";
        ctx.fillText(this.name, this.x, this.y);
    }
}