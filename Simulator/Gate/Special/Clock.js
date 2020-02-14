class Clock extends Gate {

    /*
        This gate has no inputs
        It counts the number of frames and its outputs changes every <period> frames
     */

    static openedPopup; // This variable saves the clock that requested a popup openning (the one that should be modified)

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
        Popup.open();
        Popup.addTitle("Clock configuration");
        Popup.addSpace();
        Popup.addFields([{id: "clockPeriod", defaultValue: this.period}], "Period (milliseconds):");
        Popup.addFields([{id: "clockCurrent", defaultValue: this.current}], "Current (milliseconds):");
        Popup.addDoneButton(Clock.chooseParameters);
        Clock.openedPopup = this;
    }

    /*** This function is called by the Done button on the popup */
    static chooseParameters() {

        const period = document.getElementById("clockPeriod").value;
        if(!isNaN(period))
            Clock.openedPopup.period = period;

        const current = document.getElementById("clockCurrent").value;
        if(!isNaN(current))
            Clock.openedPopup.current = current;

        Popup.close();
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