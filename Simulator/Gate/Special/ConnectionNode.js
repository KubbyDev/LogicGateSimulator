class ConnectionNode extends Gate {

    /*
        This gate is not really a gate, it is only there for technical reasons and to redirect wires
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

    // Graphical properties --------------------------------------------------------------------------------------------

}