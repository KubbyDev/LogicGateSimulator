class ConnectionNode extends Gate {

    /*
        Comme un output sauf que c'est plus petit et le courant passe dedans sans delai
     */

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    tickEnd() {
        super.tickEnd();
        this.color = this.output ? this.upColor : this.downColor;
    }

    //Proprietes graphiques --------------------------------------------------------------------------------------------

    upColor = "#ea120c";
    downColor = "#7a7a7a";

}