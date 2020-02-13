let wiringModeSelectedOutput; // The gate output that will be used for the connection that is being built
let wiringModeSelectedInput; // The gate input that will be used for the connection that is being built
let wiringModeInputIndex; // The index of the selectedOutput among the inputs of the selectedInput
let wiringModeButtons; // Buttons that should be displayed only in this mode
let wiringMode_AUTO_SNAP_RANGE = 50; // Maximum distance of the auto select of connection slots

class WiringMode {

    static get buttons() {
        return wiringModeButtons;
    }

    // Events ----------------------------------------------------------------------------------------------------------

    static init() {
        wiringModeButtons = [];
    }

    /*** Called when the user switches to this mode */
    static enable() {
        interfaceMode = 1;
        wiringModeSelectedOutput = undefined;
        wiringModeSelectedInput = undefined;
    }

    /*** Called on every frame when this menu is selected at
     * the moment of the interface update (begining of the frame calculation)*/
    static earlyUpdate() {

        // If an input or an output is selected
        if (wiringModeSelectedOutput || wiringModeSelectedInput) {

            // One of the ends on the connection will be the mouse, the other will be the selected input or output
            // For outputs we can calculate the position without worrying about custom gates because their output gates
            // Are places such that they align with the connections.
            const alreadySelected = wiringModeSelectedInput
                ? wiringModeSelectedInput.getInputPosition(wiringModeInputIndex)
                : [wiringModeSelectedOutput.x + wiringModeSelectedOutput.width / 2 - connectionWidth, wiringModeSelectedOutput.y];

            const suggestion = WiringMode.findClosestConnectionSlot(wiringModeSelectedOutput !== undefined);
            const secondSlotSuggestion = suggestion !== undefined ? [suggestion.x, suggestion.y] : [mouseX, mouseY];

            // Draws a line
            ctx.beginPath();
            ctx.strokeStyle = "#d3d3d3";
            ctx.lineWidth = connectionWidth;
            ctx.moveTo(alreadySelected[0], alreadySelected[1]);
            ctx.lineTo(secondSlotSuggestion[0], secondSlotSuggestion[1]);
            ctx.stroke();
        }
    }

    /*** Called on every frame when this menu is selected at
     * the moment of the interface draw (end of the frame calculation)*/
    static lateUpdate() {
        if (wiringModeSelectedOutput || wiringModeSelectedInput) {
            const suggestion = WiringMode.findClosestConnectionSlot(wiringModeSelectedOutput !== undefined);
            if(suggestion)
                fillCircle(suggestion.x, suggestion.y, 10*interfaceZoomFactor, "rgba(255, 255, 255, 0.5)", false);
        }
        else {
            // Draws a small circle on the suggested connection slot
            const suggestion = WiringMode.findClosestConnectionSlot();
            if(suggestion)
                fillCircle(suggestion.x, suggestion.y, 10*interfaceZoomFactor, "rgba(255, 255, 255, 0.5)", false);
        }
    }

    /*** Called when the user clicks somewhere with this mode selected */
    static onClick() {
        WiringMode.handleClick();
    }

    /*** Called for each key press with this mode selected */
    static onKeyPressed(key) {
    }

    // Connections management ------------------------------------------------------------------------------------------

    // Finds the connection slot that is closest to the mouse.
    // searchInput = true => only inputs, searchInput = false => only outputs, searchInput = undefined => both
    // Returns undefined if no slot is found (or if the closest is out of range, range being wiringMode_AUTO_SNAP_RANGE)
    // Inputs are in the point of view of the gate (so true will return gate inputs)
    static findClosestConnectionSlot(searchInput) {

        let closest = undefined;
        let closestDistanceSqr = Infinity;

        function updateClosest(connector) {
            const distanceSqr = sqr(mouseX-connector.x) + sqr(mouseY-connector.y);
            if(distanceSqr < sqr(wiringMode_AUTO_SNAP_RANGE*interfaceZoomFactor) && distanceSqr < closestDistanceSqr) {
                closestDistanceSqr = distanceSqr;
                closest = connector;
            }
        }

        for(let gate of gates) {

            // If we are searching for inputs
            if(searchInput === undefined || searchInput) {
                for(let i = 0; i < gate.maxInputs; i++) {
                    const position = gate.getInputPosition(i);
                    const connector = {x: position[0], y: position[1], gate: gate, index: i, isInput: true};
                    updateClosest(connector);
                }
            }

            // If we are searching for outputs
            if(searchInput === undefined || !searchInput) {
                for(let i = 0; i < gate.maxOutputs; i++) {
                    const position = gate.getOutputPosition(i);
                    const connector = {x: position[0], y: position[1], gate: gate, index: i, isInput: false};
                    updateClosest(connector);
                }
            }
        }

        return closest;
    }

    // Handles the changes to the connections when the user clicks
    static handleClick() {

        // This variable defines what type of slot we are looking for (true = input, false = output, undefined = both)
        let lookingForInputs = undefined;
        if(wiringModeSelectedInput) lookingForInputs = false;
        if(wiringModeSelectedOutput) lookingForInputs = true;
        
        // Finds the closest gate between the ones we are looking for
        let slot = WiringMode.findClosestConnectionSlot(lookingForInputs);

        // If there is no gate nearby, stops everything
        if(! slot) {
            wiringModeSelectedOutput = undefined;
            wiringModeSelectedInput = undefined;
            return;
        }

        // If the user clicked on an input without havng selected any slot and if the selected input already has
        // something connected, disconnects the connection on its output and puts the connection destination as selectedOutput
        if(! wiringModeSelectedInput && ! wiringModeSelectedOutput && slot.isInput && slot.gate.inputs[slot.index]) {
            wiringModeSelectedOutput = slot.gate.inputs[slot.index].destination;
            slot.gate.inputs[slot.index] = undefined;
            return;
        }

        // If no output is selected for the moment and the user clicked on an output
        if(! wiringModeSelectedOutput && ! slot.isInput)
            wiringModeSelectedOutput = slot.gate.getGateForOutput(slot.index);

        // If no input is selected for the moment and the user clicked on an input
        if(! wiringModeSelectedInput && slot.isInput) {
            wiringModeSelectedInput = slot.gate;
            wiringModeInputIndex = slot.index;
        }

        // If both the input and the output are defined, builds a Connection
        if(wiringModeSelectedInput && wiringModeSelectedOutput) {
            wiringModeSelectedInput.addInput(wiringModeSelectedOutput, wiringModeInputIndex);
            wiringModeSelectedOutput = undefined;
            wiringModeSelectedInput = undefined;
        }
    }
}