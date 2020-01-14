class Switch extends Gate {

    /*
        Interrupteur
     */

    constructor() {
        super();
        this.isOn = true;
    }

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    update() {

        if(!this.isOn) {
            this.tempOutput = false;
            return;
        }

        super.update();
    }

    /***
     * Inverse l'etat de l'interrupteur
     */
    onClick() {
        this.isOn = !this.isOn;
    }

    serializeParameters() {
        return "@" + (this.isOn ? "1" : "0");
    }

    parseParameters(parameters) {
        this.isOn = parameters[1] === "1"; //0 est le type de la porte
    }

    //Proprietes graphiques --------------------------------------------------------------------------------------------

    drawBody() {

        super.drawBody();

        if(!this.isOn) {
            ctx.fillStyle = interfaceBackgroundColor;
            ctx.fillRect(this.x - this.width/2 + this.width/5, this.y - this.height/2, this.width - 2*this.width/5, this.height);
        }
    }
}