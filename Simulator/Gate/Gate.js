class Gate {

    /*
        Base class of all gates
        It can work as a Gate, or be extended to change some behaviour
     */

    constructor() {

        this.activation = () => true; // Activation function. For example to create an AND put (a,b) => a&&b
        this.inputs = [];             // References to Connections that lead to the gates that serves as input of this gate
        this.tempOutput = false;      // The output during the update. Copied in output at the end of the update
        this.output = false;          // State of the output of the gate
        this.maxInputs = 0;           // The maximum number of inputs this gate can have
        this.id = gates.length;       // The identifier of the gate (its index in gates)

        this.x = 10;                  // Position x of the center of the gate (horizontal, 0 = left)
        this.y = 10;                  // Position y of the center of the gate (vertical, 0 = top)
        this.width = 20;              // The width of the gate, can vary with zoom
        this.height = 20;             // The height of the gate, can vary with zoom
        this.color = "#379f1f";       // The color
        this.type = "Gate";           // Stores the name of the function in GateFactory used to generate this gate (useful for custom gates)
        this.name = "Gate";           // Display name
        this.fontSize = 8;            // Font size of the display name, can vary with zoom
        this.hideName = false;        // Hide the display name
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    /*** Changes the gate's functionnal properties */
    setFonctionnalProperties(activation, inputs, maxInputs) {

        this.activation = activation;
        this.maxInputs = maxInputs !== undefined ? maxInputs : 0;
        this.setInputs(inputs !== undefined ? inputs : []);
        return this;
    }

    /*** Creates Connections to the Gates in parameter */
    setInputs(inputGates) {
        this.inputs = inputGates.map(inputGate => new Connection(this, inputGate)).slice(0,this.maxInputs);
        return this;
    }

    setHideName(hideName) {
        this.hideName = hideName;
        return this;
    }

    /*** Adds an input (does nothing if the gate already has all its inputs)
     * Puts the Connection at a specific index if requested */
    addInput(gate, index) {

        if(index !== undefined && index < this.maxInputs)
            this.inputs[index] = new Connection(this, gate);
        else if (this.inputs.length < this.maxInputs)
            this.inputs.push(new Connection(this, gate));
    }

    /*** Updates the tempOutput of the gate according to the inputs
     * Can be overriden by child classes for custom behaviour */
    update() {
        let inputs = this.inputs.map(connection => connection !== undefined && connection.getValue());
        this.tempOutput = this.activation(inputs);
    }

    /*** Call this function at the end of each update */
    tickEnd() {
        this.output = this.tempOutput;
    }

    /*** Updates all the gates */
    static updateAll(gates) {

        for(let gate of gates)
            gate.update();

        for(let gate of gates)
            gate.tickEnd();
    }

    /*** Removes all the connections from this gate to the gates in allGates */
    static removeAllConnectionsTo(gate, allGates) {

        for(let g of allGates)
            for(let i = 0; i < g.inputs.length; i++)
                if(g.inputs[i] && g.inputs[i].destination === gate)
                    g.inputs[i] = undefined;
    }

    /*** Returns the index of the nearest connector
     * If it is an input the index will be positive (1 and higher), negative if it is an output (-1 and lower)
     * Overriden by CustomGate to be able to select the output */
    getConnector(x,y) {

        if(x > this.x || this.maxInputs < 1) // If the position is on the right then the output is selected
            return -1;

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

    /*** Returns the corresponding gate for a given output number (useful for custom gates) */
    getGateForOutput(index) {
        return this;
    }

    /*** Returns a string that contains the parameters of the gate (the clock's period for example)
     * Useful for custom gate creation */
    serializeParameters() {
        return "";
    }

    /*** Applies the parameters on the gate (Useful to load custom gates) */
    parseParameters(parameters) {
    }

    /*** Called when the user clicks on the gate in Interaction mode */
    onClick() {
    }

    // Graphical properties --------------------------------------------------------------------------------------------

    /*** Changes the gates graphical properties */
    setGraphicProperties(x, y, width, height, color, type, name) {

        this.x = x;
        this.y = y;
        this.width = width * interfaceZoomFactor;
        this.height = height * interfaceZoomFactor;
        this.color = color;
        this.type = type;
        this.name = name !== undefined ? name : type;

        this.fontSize *= interfaceZoomFactor;

        return this;
    }

    /*** Changes the position of the gate (its center) */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    draw() {

        this.drawBody();

        if(!this.hideName) {
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = this.fontSize + "px Arial";
            ctx.fillText(this.name, this.x, this.y);
        }
    }

    /*** Draws the body of the gate (almost always overriden or redifined) */
    drawBody() {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }

    static drawAll(gates) {

        // Draws all the connections of all the gates
        for(let gate of gates)
            for(let i = 0; i < gate.maxInputs; i++)
                if(gate.inputs[i])
                    gate.inputs[i].draw(i);

        // Draws all the gates
        for(let gate of gates)
            gate.draw();
    }

    /*** Returns the position of the ith input in the simulator plane */
    getInputPosition(index) {
        return [
            this.x - this.width/2  + this.width/4,
            this.y - this.height/2 + this.height*(index+1)/(this.maxInputs+1)
        ]
    }

    /*** Returns the position of the output in the simulator plane */
    getOutputPosition() {
        return [
            this.x + this.width/2 - connectionWidth,
            this.y
        ]
    }
}