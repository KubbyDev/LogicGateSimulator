let wiringModeSelectedInput; // The gate that acts as the input of the current connection (it has the connection on its output)
let wiringModeSelectedOutput; // The gate that acts as the ouptut of the current connection (it has the connection on its input)
let wiringModeInputIndex; // The index of the selectedInput among the inputs of the selectedOutput
let wiringModeButtons; // Buttons that should be displayed only in this mode

class WiringMode {

    static get buttons() {
        return wiringModeButtons;
    }

    /*** Called when the user clicks somewhere with this mode selected */
    static onClick() {

        let gate = getGateAtPosition(mouseX, mouseY);

        // If the user clicks where there is nothing, stops everything
        if(!gate) {
            wiringModeSelectedInput = null;
            wiringModeSelectedOutput = null;
            return;
        }

        let connectorIndex = gate.getConnector(mouseX, mouseY);

        // If the user clicked on a gate input without havng selected a connection input
        // and if the selected input already has something connected, disconnects the connection on its output
        // and puts the connection input as selectedInput
        if(!wiringModeSelectedInput && connectorIndex > 0 && gate.inputs[connectorIndex-1]) {
            wiringModeSelectedInput = gate.inputs[connectorIndex-1].destination;
            gate.inputs[connectorIndex-1] = undefined;
            return;
        }

        // If no input is selected for the moment
        // and the user clicked on an output (that can then be the selectedInput)
        if(!wiringModeSelectedInput && connectorIndex < 0)
            wiringModeSelectedInput = gate.getGateForOutput(-connectorIndex-1);

        // If no output is selected for the moment
        // and the user clicked on an input (that can then be the selectedOutput)
        if(!wiringModeSelectedOutput && connectorIndex > 0) {
            wiringModeSelectedOutput = gate;
            wiringModeInputIndex = connectorIndex-1;
        }

        // If both the input and the output are defined, builds a Connection
        if(wiringModeSelectedOutput && wiringModeSelectedInput) {
            wiringModeSelectedOutput.addInput(wiringModeSelectedInput, wiringModeInputIndex);
            wiringModeSelectedInput = null;
            wiringModeSelectedOutput = null;
        }
    }

    /*** Called on every frame when this menu is selected */
    static update() {

        // If an input or an output is selected
        if(wiringModeSelectedInput || wiringModeSelectedOutput) {

            // One of the ends on the connection will be the mouse, the other will be the selected input or output
            let otherPoint = wiringModeSelectedOutput
                ? wiringModeSelectedOutput.getInputPosition(wiringModeInputIndex)
                : [wiringModeSelectedInput.x  + wiringModeSelectedInput.width/2 - connectionWidth, wiringModeSelectedInput.y];

            // Draws a line
            ctx.beginPath();
            ctx.strokeStyle = "#d3d3d3";
            ctx.lineWidth = connectionWidth;
            ctx.moveTo(otherPoint[0], otherPoint[1]);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();

        }
    }

    /*** Called when the user switches to this mode */
    static enable() {
        interfaceMode = 1;
        wiringModeSelectedInput = null;
        wiringModeSelectedOutput = null;
    }

    /*** Updates and draws the menu on the right */
    static updateContextualMenu() {
    }

    static init() {
        wiringModeButtons = [];
    }

    /*** Called for each key press with this mode selected */
    static onKeyPressed(key) {
    }
}