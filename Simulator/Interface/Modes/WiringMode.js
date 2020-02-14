class WiringMode {

    static AUTO_SNAP_RANGE = 40; // Maximum distance of the auto select of connection slots

    static selectedOutput; // The gate output that will be used for the connection that is being built
    static selectedInput; // The gate input that will be used for the connection that is being built
    static inputIndex; // The index of the selectedOutput among the inputs of the selectedInput
    static buttons; // Buttons that should be displayed only in this mode

    // Events ----------------------------------------------------------------------------------------------------------

    static init() {
        WiringMode.buttons = [];
    }

    /*** Called when the user switches to this mode */
    static enable() {
        Interface.mode = 1;
        WiringMode.selectedOutput = undefined;
        WiringMode.selectedInput = undefined;
    }

    /*** Called on every frame when this menu is selected at
     * the moment of the interface update (begining of the frame calculation)*/
    static earlyUpdate() {

        // If an input or an output is selected
        if (WiringMode.selectedOutput || WiringMode.selectedInput) {

            // One of the ends on the connection will be the mouse, the other will be the selected input or output
            // For outputs we can calculate the position without worrying about custom gates because their output gates
            // Are places such that they align with the connections.
            const alreadySelected = WiringMode.selectedInput
                ? WiringMode.selectedInput.getInputPosition(WiringMode.inputIndex)
                : [WiringMode.selectedOutput.x + WiringMode.selectedOutput.width / 2 - Interface.connectionWidth, WiringMode.selectedOutput.y];

            const suggestion = WiringMode.findClosestConnectionSlot(WiringMode.selectedOutput !== undefined);
            const secondSlotSuggestion = suggestion !== undefined ? [suggestion.x, suggestion.y] : [mouseX, mouseY];

            // Draws a line
            ctx.beginPath();
            ctx.strokeStyle = "#d3d3d3";
            ctx.lineWidth = Interface.connectionWidth;
            ctx.moveTo(alreadySelected[0], alreadySelected[1]);
            ctx.lineTo(secondSlotSuggestion[0], secondSlotSuggestion[1]);
            ctx.stroke();
        }
    }

    /*** Called on every frame when this menu is selected at
     * the moment of the interface draw (end of the frame calculation)*/
    static lateUpdate() {
        if (WiringMode.selectedOutput || WiringMode.selectedInput) {
            const suggestion = WiringMode.findClosestConnectionSlot(WiringMode.selectedOutput !== undefined);
            if(suggestion)
                Tools.fillCircle(suggestion.x, suggestion.y, 10*Interface.zoomFactor, "rgba(255, 255, 255, 0.5)", false);
        }
        else {
            // Draws a small circle on the suggested connection slot
            const suggestion = WiringMode.findClosestConnectionSlot();
            if(suggestion)
                Tools.fillCircle(suggestion.x, suggestion.y, 10*Interface.zoomFactor, "rgba(255, 255, 255, 0.5)", false);
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
    // Returns undefined if no slot is found (or if the closest is out of range, range being WiringMode.AUTO_SNAP_RANGE)
    // Inputs are in the point of view of the gate (so true will return gate inputs)
    static findClosestConnectionSlot(searchInput) {

        let closest = undefined;
        let closestDistanceSqr = Infinity;

        function updateClosest(connector) {
            const distanceSqr = Tools.sqr(mouseX-connector.x) + Tools.sqr(mouseY-connector.y);
            if(distanceSqr < Tools.sqr(WiringMode.AUTO_SNAP_RANGE*Interface.zoomFactor) && distanceSqr < closestDistanceSqr) {
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
        if(WiringMode.selectedInput) lookingForInputs = false;
        if(WiringMode.selectedOutput) lookingForInputs = true;
        
        // Finds the closest gate between the ones we are looking for
        let slot = WiringMode.findClosestConnectionSlot(lookingForInputs);

        // If there is no gate nearby, stops everything
        if(! slot) {
            WiringMode.selectedOutput = undefined;
            WiringMode.selectedInput = undefined;
            return;
        }

        // If the user clicked on an input without havng selected any slot and if the selected input already has
        // something connected, disconnects the connection on its output and puts the connection destination as selectedOutput
        if(! WiringMode.selectedInput && ! WiringMode.selectedOutput && slot.isInput && slot.gate.inputs[slot.index]) {
            WiringMode.selectedOutput = slot.gate.inputs[slot.index].destination;
            slot.gate.inputs[slot.index] = undefined;
            return;
        }

        // If no output is selected for the moment and the user clicked on an output
        if(! WiringMode.selectedOutput && ! slot.isInput)
            WiringMode.selectedOutput = slot.gate.getGateForOutput(slot.index);

        // If no input is selected for the moment and the user clicked on an input
        if(! WiringMode.selectedInput && slot.isInput) {
            WiringMode.selectedInput = slot.gate;
            WiringMode.inputIndex = slot.index;
        }

        // If both the input and the output are defined, builds a Connection
        if(WiringMode.selectedInput && WiringMode.selectedOutput) {
            WiringMode.selectedInput.addInput(WiringMode.selectedOutput, WiringMode.inputIndex);
            WiringMode.selectedOutput = undefined;
            WiringMode.selectedInput = undefined;
        }
    }
}