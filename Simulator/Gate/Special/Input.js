class Input extends Gate {

    /*
        ON/OFF switch
        Also used to designate the inputs of custom gates
     */

    constructor() {
        super();
        this.upColor = "#ea120c";
        this.downColor = "#7a7a7a";
        this.isOn = true;
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    update() {
        this.tempOutput = this.isOn;
    }

    /*** Toggles the output */
    onClick() {
        this.isOn = !this.isOn;
    }

    /*** Creates an object that contains all the useful to save this gate in a save file */
    createSave() {
        let gateSave = super.createSave();
        gateSave.isOn = this.isOn;
        return gateSave;
    }

    // Graphical properties --------------------------------------------------------------------------------------------

    drawBody() {

        super.drawBody();

        ctx.fillStyle = this.isOn ? this.upColor : this.downColor;
        ctx.fillRect(
            this.x - this.width/2 + this.width/8,
            this.y - this.height/2 + this.height/8,
            this.width - 2*this.width/8,
            this.height - 2*this.height/8
        );
    }
}