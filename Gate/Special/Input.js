class Input extends Gate {

    /*
        Bouton on/off
        Sert aussi a designer les entrees des CustomGates
     */

    constructor() {
        super();
        this.upColor = "#ea120c";
        this.downColor = "#7a7a7a";
        this.isOn = true;
    }

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    update() {
        this.tempOutput = this.isOn;
    }

    /***
     * Inverse l'etat de l'input
     */
    onClick() {
        this.isOn = !this.isOn;
    }

    //Proprietes graphiques --------------------------------------------------------------------------------------------

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