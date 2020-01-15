function saveSimulatorState() {

    // TODO Special case of custom gates

    // Replaces the Connection objects by the index of the Connection's destination.
    // Saves the Connections before so nothing breaks during the saving
    let inputs = [];
    for(let i = 0; i < gates.length; i++) {
        inputs[i] = gates[i].inputs;
        gates[i].inputs = inputs[i].map(input => input.destination.id);
    }

    // Creates the save as a string and downloads it
    download(JSON.stringify(gates), "LogicGateSimulator.save");

    // Puts back the Connection objects
    for(let i = 0; i < gates.length; i++)
        gates[i].inputs = inputs[i];
}

function loadSimulatorState(data) {

    gates = JSON.parse(data).map(obj => {
        // Calls the function of name obj.type in GateFactory
        let gateConstructor = GateFactory[obj.type]
        let g = gateConstructor(0,0);
        // Copies all the properties of obj into g
        Object.assign(g, obj);
        return g;
    });

    // For each gate, replaces each index in gate.inputs by a Connection to the gate at this index
    for(let gate of gates) {
        let inputs = gate.inputs;
        gate.inputs = [];
        for(let i = 0; i < inputs.length; i++)
            if(inputs[i] !== null)
                gate.inputs.push(new Connection(gate, gates[inputs[i]]));
    }
}