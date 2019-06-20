class Output extends Gate {

    /*
        Ampoule
        Sert aussi a designer les sorties des CustomGates
     */

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

    upColor = "#ea120c";
    downColor = "#7a7a7a";
}