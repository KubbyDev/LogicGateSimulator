class Output extends Gate {

    /*
        Like a light bulb
        Also used to designate custom gates outputs
     */

    constructor() {
        super();
        this.upColor = "#ea120c";
        this.downColor = "#7a7a7a";
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    tickEnd() {
        super.tickEnd();
        this.color = this.output ? this.upColor : this.downColor;
    }

    // Prevents the gate from having outputs
    getConnector(x,y) {
        return 1;
    }

    // Graphical properties --------------------------------------------------------------------------------------------

}