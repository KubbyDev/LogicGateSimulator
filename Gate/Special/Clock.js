class Clock extends Gate {

    /*
        Cette porte n'a pas d'input
        Elle compte le nombre de frames et sa sortie change d'etat tout les <period> frames
     */

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    period = 50; //Le nombre de frames avant un changement d'etat
    current = 0; //Le nombre de frames avant le prochain changement d'etat

    update() {

        this.current--;
        if(this.current < 0) {
            this.current = this.period;
            this.tempOutput = !this.output;
        }
    }

    /***
     * Ouvre un popup pour choisir la periode
     */
    onClick() {

        Interface.openPopup();

        let mainDiv = document.getElementById("popup_main_div");
        let input = document.createElement("INPUT");
        input.id = "clockInput";
        let button = document.createElement("BUTTON");
        button.addEventListener('click', Clock.choosePeriod);
        button.innerHTML = "Done";
        let div = document.createElement("DIV");
        div.appendChild(input);
        div.appendChild(button);
        mainDiv.appendChild(div);

        Clock.openedPopup = this;
    }

    static openedPopup; //Cette variable enregistre la clock qui a requis l'ouverture d'un popup (celle qui doit donc etre modifiee)
    /***
     * Cette fonction est appellee par le bouton Done du popup
     */
    static choosePeriod() {

        let chosenValue = document.getElementById("clockInput").value;
        if(!isNaN(chosenValue))
            Clock.openedPopup.setPeriod(chosenValue);

        Interface.closePopup();
    }

    /***
     * Change la periode de la clock (nombre de frames entre 2 changements d'etat)
     * @param period
     * @param current
     * @returns {Clock}
     */
    setPeriod(period, current) {

        this.period = period;

        if(current)
            this.current = current;

        return this;
    }

    serializeParameters() {
        return `@${this.period}@${this.current}`;
    }

    parseParameters(parameters) {
        this.period = parameters[1]; //0 est le type de la porte
        this.current = parameters[2];
    }
}