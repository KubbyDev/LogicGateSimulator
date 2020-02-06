let clockOpenedPopup; // This variable saves the clock that requested a popup openning (the one that should be modified)

class Clock extends Gate {

    /*
        This gate has no inputs
        It counts the number of frames and its outputs changes every <period> frames
     */

    constructor() {
        super();
        this.period = 50; // The number of frames between 2 state changes
        this.current = 0; // The number of frames before the next state change
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    update() {

        this.current--;
        if(this.current < 0) {
            this.current = this.period;
            this.tempOutput = !this.output;
        }
    }

    /*** Opens a popup to choose the period and current values */
    onClick() {

        Interface.openPopup();

        let mainDiv = document.getElementById("popup_main_div");

        let text1 = document.createElement("P");
        text1.innerHTML = "Period: ";
        let input1 = document.createElement("INPUT");
        input1.id = "clockPeriod";
        input1.value = this.period;
        let text2 = document.createElement("P");
        text2.innerHTML = "Current: ";
        let input2 = document.createElement("INPUT");
        input2.id = "clockCurrent";
        input2.value = this.current;

        let button = document.createElement("BUTTON");
        button.addEventListener('click', Clock.chooseParameters);
        button.innerHTML = "Done";

        let div = document.createElement("DIV");
        text1.appendChild(input1);
        div.appendChild(text1);
        text2.appendChild(input2);
        div.appendChild(text2);
        div.appendChild(button);
        mainDiv.appendChild(div);

        clockOpenedPopup = this;
    }

    /*** This function is called by the Done button on the popup */
    static chooseParameters() {

        let period = document.getElementById("clockPeriod").value;
        if(!isNaN(period))
            clockOpenedPopup.period = period;

        let current = document.getElementById("clockCurrent").value;
        if(!isNaN(current))
            clockOpenedPopup.current = current;

        Interface.closePopup();
    }

    /*** Changes the clock's period */
    setPeriod(period, current) {

        this.period = period;

        if(current)
            this.current = current;

        return this;
    }

    /***  Serializes the parameters of the clock (useful to create a custom gate) */
    serializeParameters() {
        return `@${this.period}@${this.current}`;
    }

    /*** Applies the parameters of the clock (useful to load a custom gate) */
    parseParameters(parameters) {
        this.period = parameters[1]; //0 est le type de la porte
        this.current = parameters[2];
    }

    /*** Creates an object that contains all the useful to save this gate in a save file */
    createSave() {
        let gateSave = super.createSave();
        gateSave.period = this.period;
        gateSave.current = this.current;
        return gateSave;
    }
}