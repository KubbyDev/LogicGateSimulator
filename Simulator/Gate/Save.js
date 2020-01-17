function askForStateSave() {

    // Asks the user to choose a .lgs file
    let elem = window.document.createElement('INPUT');
    elem.accept = ".lgs";
    elem.type = "file";
    elem.click();

    // Reads the file and calls loadSimulatorState with its content
    elem.addEventListener('change', () => {
        if(elem.files[0])
            elem.files[0].text().then(loadSimulatorState);
    });
}

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
    let data = {
        gates: gates,
        interfaceZoomFactor: interfaceZoomFactor
    };
    download(JSON.stringify(data), "LogicGateSimulator.lgs");

    // Puts back the Connection objects
    for(let i = 0; i < gates.length; i++)
        gates[i].inputs = inputs[i];
}

function loadSimulatorState(data) {

    let dataObj = JSON.parse(data);

    interfaceZoomFactor = dataObj.interfaceZoomFactor;

    gates = dataObj.gates.map(obj => {
        // Calls the function of name obj.type in GateFactory
        let gateConstructor = GateFactory[obj.type];
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