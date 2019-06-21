class Output extends Gate {

    /*
        Ampoule
        Sert aussi a designer les sorties des CustomGates
     */

    constructor() {
        super();
        this.upColor = "#ea120c";
        this.downColor = "#7a7a7a";
    }

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    tickEnd() {
        super.tickEnd();
        this.color = this.output ? this.upColor : this.downColor;
    }

    //Empeche l'Output d'avoir des outputs
    getConnector(x,y) {
        return 1;
    }

    //Proprietes graphiques --------------------------------------------------------------------------------------------

}