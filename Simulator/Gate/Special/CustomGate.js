/*
Custom gates are like a box where you put some gates but they are displayed as one gate.
The simulator sees it as one gate, but during the simulation the custom gate will simulate its internal
circuit as if it was real. Only the gate itself and the outputGates have ids (useful for saving)
 */
class CustomGate extends Gate {

    constructor() {
        super();
        this.internGates = []; // List of the gates that are contained in this custom gate
        this.inputGates = [];  // List of the gates that act as inputs. Not in internGates
        this.outputGates = []; // List of the Nodes that act as outputs. Not in internGates
        this.string = "";      // String used to build this gate
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    update() {

        // Takes the input values and puts them in the input gates
        for(let i = 0; i < this.inputGates.length; i++)
            this.inputGates[i].output = this.inputs[i] && this.inputs[i].getValue();

        // Simulates the internal circuit
        // The outputs of the custom gate are Nodes connected to some
        // gates of the internal circuit so they are automatically updated
        for(let gate of this.internGates)
            gate.update();
    }

    tickEnd() {
        for(let gate of this.internGates)
            gate.tickEnd();
    }

    /*** Returns the gate that corresponds to the given index */
    getGateForOutput(index) {
        return this.outputGates[index];
    }

    /*** Returns the index of the nearest connector
     * If it is an input the index will be positive (1 and higher), negative if it is an output (-1 and lower) */
    getConnector(x,y) {

        if(x > this.x || this.maxInputs < 1) { // If we are on the right of the gate or if it has no input

            let minDistY = Infinity;
            let minIndex = 0;
            for(let i = 0; i < this.outputGates.length; i++) {
                let dist = Math.abs(this.y - this.height/2 + this.height*(i+1)/(this.outputGates.length+1) - y);
                if(dist < minDistY) {
                    minIndex = i+1;
                    minDistY = dist;
                }
            }

            return -minIndex;
        }

        let minDistY = Infinity;
        let minIndex = 0;
        for(let i = 0; i < this.maxInputs; i++) {
            let dist = Math.abs(this.getInputPosition(i)[1] - y);
            if(dist < minDistY) {
                minIndex = i+1;
                minDistY = dist;
            }
        }

        return minIndex;
    }

    /*** Displays a popup that shows the string used to build this gate */
    onClick() {
        Popup.open();
        Popup.addTitle("Custom Gate Information");
        Popup.addSpace();
        Popup.addText(this.string);
        Popup.addDoneButton(Popup.close);
    }

    /*** Creates an object that contains all the useful to save this gate in a save file */
    createSave() {
        let gateSave = super.createSave();
        gateSave.string = this.string;
        gateSave.maxInputs = this.maxInputs;
        return gateSave;
    }

    // Graphical properties --------------------------------------------------------------------------------------------

    draw() {

        // Updates the position of the outputs so connections are displayed correctly
        for(let i = 0; i < this.outputGates.length; i++) {

            let position = this.getOutputPosition(i);
            this.outputGates[i].x = position[0];
            this.outputGates[i].y = position[1];
        }

        super.draw();

        // Displays the names of the inputs and the outputs
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = (this.fontSize*0.8) + "px Arial";
        for(let i = 0; i < this.outputGates.length; i++) {
            let position = this.getOutputPosition(i);
            ctx.fillText(this.outputGates[i].name, position[0] - this.width/10, position[1]);
        }
        for(let i = 0; i < this.inputGates.length; i++) {
            let position = this.getInputPosition(i);
            ctx.fillText(this.inputGates[i].name, position[0] - this.width/10, position[1]);
        }
    }

    /*** Returns the position of the ith output on the gate */
    getOutputPosition(index) {
        return [
            this.x + this.width/2 - connectionWidth,
            this.y - this.height/2 + this.height*(index+1)/(this.outputGates.length+1)
        ]
    }

    /*** Displays the menu to select the names of the inputs/outputs to create a new custom gate */
    static openPopup() {

        Popup.open();

        // Counts the number of inputs and outputs of the gate
        let nbInputs = 0;
        let nbOutputs = 0;
        for(let gate of gates) {
            if(gate instanceof Input)
                nbInputs++;
            if(gate instanceof Output)
                nbOutputs++;
        }

        Popup.addTitle("Custom Gate Configuration");
        Popup.addSpace();

        Popup.addFields([{id: "name"}], "Gate name");
        Popup.addSpace();

        //Creates the fields for the inputs
        let inputs = [];
        for(let i = 0; i < nbInputs; i++)
            inputs.push({id: "input" + i});
        if(inputs.length > 0)
            Popup.addFields(inputs, "Input names");
        Popup.addSpace();

        //Creates the fields for the outputs
        let outputs = [];
        for(let i = 0; i < nbOutputs; i++)
            outputs.push({id: "output" + i});
        if(inputs.length > 0)
            Popup.addFields(outputs, "Output names");
        Popup.addSpace();

        Popup.addDoneButton(() => {

            // Retrieving of the inputs
            let inputs = [];
            for(let i = 0; i < nbInputs; i++)
                inputs[i] = document.getElementById("input" + i).value;

            // Retrieving of the outputs
            let outputs = [];
            for(let i = 0; i < nbOutputs; i++)
                outputs[i] = document.getElementById("output" + i).value;

            // Creation of the gate
            let gate = SerializerParser.parseCustomGate(SerializerParser.serializeCustomGate(document.getElementById("name").value, inputs, outputs));
            BuildMode.addGate(gate, false);

            // Displays the interface to show the serialized string
            Popup.close();
            gate.onClick();

            // Saves this gate as the lastCustomGate
            buildModeLastCustomGate = gate.string;
        });
    }
}