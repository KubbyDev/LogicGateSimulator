class Output extends Gate {

    /*
        Like a light bulb
        Also used to designate custom gates outputs
     */

    constructor() {
        super();
        this.upColor = "#ea120c";
        this.downColor = "#7a7a7a";
        this.maxOutputs = 0;
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    tickEnd() {
        super.tickEnd();
        this.color = this.output ? this.upColor : this.downColor;
    }

    // Graphical properties --------------------------------------------------------------------------------------------

}