class Input extends Gate {

    /*
        Bouton on/off
        Sert aussi a designer les entrees des CustomGates
     */

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    isOn = true;

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

    upColor = "#ae110b";
    downColor = "#7a7a7a";

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