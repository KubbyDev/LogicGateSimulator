class Switch extends Gate {

    constructor() {
        super();
        this.isOn = true;
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    update() {

        if(!this.isOn) {
            this.tempOutput = false;
            return;
        }

        super.update();
    }

    /*** Toggles the state of the switch */
    onClick() {
        this.isOn = !this.isOn;
    }

    serializeParameters() {
        return "@" + (this.isOn ? "1" : "0");
    }

    parseParameters(parameters) {
        this.isOn = parameters[1] === "1"; //0 is the type on the gate
    }

    // Graphical properties --------------------------------------------------------------------------------------------

    drawBody() {

        super.drawBody();

        if(!this.isOn) {
            ctx.fillStyle = interfaceBackgroundColor;
            ctx.fillRect(this.x - this.width/2 + this.width/5, this.y - this.height/2, this.width - 2*this.width/5, this.height);
        }
    }
}