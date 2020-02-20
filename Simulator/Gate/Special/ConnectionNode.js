class ConnectionNode extends Gate {

    /*
        This gate is not really a gate, it is only there for technical reasons and to redirect wires
     */

    constructor() {
        super();
        this.upColor = "#ea120c";
        this.downColor = "#7a7a7a";
    }

    // Functionnal properties ------------------------------------------------------------------------------------------

    tickEnd() {
        super.tickEnd();
        this.color = this.output ? this.upColor : this.downColor;
    }

    // Searches for the custom gate that contains this node if it exists (returns null if it doesn't exist)
    // Nodes can be wires redirectors or serve as Custom gate outputs
    // Returns the custom gate and the index of the node in its outputs
    findParentCustomGate() {

        for(let gate of gates) {

            if(!(gate instanceof CustomGate))
                continue;

            for(let i = 0; i < gate.outputGates.length; i++)
                if(gate.outputGates[i] === this)
                    return {gate: gate, outputIndex: i};
        }
        return null;
    }

    // Graphical properties --------------------------------------------------------------------------------------------

}