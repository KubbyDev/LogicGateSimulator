class SimulatorState {

    // Saving --------------------------------------------------------------------------------------------------------------

    static save(saveName) {

        let data = {
            gates: [],
            zoomFactor: Interface.zoomFactor
        };

        // Creates an object with all the useful information for each gate
        for(let gate of gates) {
            let gateData = gate.createSave();
            gateData.inputs = gate.inputs.map(input => {
                if(input === undefined || input === null)
                    return null;

                const dest = input.destination;

                // If the destination is a connection node then it can be a custom gate
                if(dest instanceof ConnectionNode) {
                    const customGate = dest.findParentCustomGate();
                    if(customGate !== null)
                        return [customGate.gate.id, customGate.outputIndex];
                }

                // If it is not a custom gate we just return the id
                return [dest.id];
            });
            data.gates.push(gateData);
        }

        // Creates the save as a string and downloads it
        Tools.download(JSON.stringify(data), (saveName || "LogicGateSimulator") + ".lgs");
    }

    // Loading -------------------------------------------------------------------------------------------------------------

    static askForSave() {

        // Asks the user to choose a .lgs file
        let elem = window.document.createElement('INPUT');
        elem.accept = ".lgs";
        elem.type = "file";
        elem.click();

        // Reads the file and calls SimulatorState.load with its content
        elem.addEventListener('change', () => {
            if(elem.files[0])
                elem.files[0].text().then(SimulatorState.load);
        });
    }

    static load(data) {

        const dataObj = JSON.parse(data);

        // The ids in the save may not start at the same point. So while loading, all ids are offset by the number
        // of gates already in the simulation state before loading.
        const gatesIdOffset = Gate.nextID;

        // Builds all the gates
        const newGates = dataObj.gates.map(saveObj => {

            let gate;
            if(saveObj.type === "CUSTOM") {
                gate = SerializerParser.parseCustomGate(saveObj.string);

            }
            else {
                // Calls the function of name obj.type in GateFactory
                const gateConstructor = GateFactory[saveObj.type];
                gate = gateConstructor(0,0);
            }

            // Copies all the properties of save object into the gate
            Object.assign(gate, saveObj);

            gate.id += gatesIdOffset; // Makes sure there is no ID collisions with already placed gates
            gate.x *= Interface.zoomFactor/dataObj.zoomFactor; // Updates the gaps between gates (width, height and
            gate.y *= Interface.zoomFactor/dataObj.zoomFactor; // fontSize are updated by setGraphicProperties)

            return gate;
        });

        // Finds the gate with the given id
        // outputIndex is for custom gates because they can have multiple
        function findGate(id, outputIndex) {

            const res = newGates.find(gate => gate.id === id);
            if(outputIndex === undefined)
                return res;

            // If the outputIndex was given it means the gate is a CustomGate
            return res.outputGates[outputIndex];
        }

        // For each gate, replaces each index in gate.inputs by a Connection to the gate at this index
        for(let gate of newGates) {
            let inputs = gate.inputs;
            gate.inputs = [];
            for(let i = 0; i < inputs.length; i++) {
                if (inputs[i] === null)
                    continue;

                // inputs[i][0] is the id of the gate. If the gate is a custom gate, inputs[i][1] is
                // the index of the connected output (will be undefined otherwise)
                const destination = findGate(inputs[i][0] + gatesIdOffset, inputs[i][1]);
                gate.inputs[i] = new Connection(gate, destination);
            }
        }

        // Adds the new gates to the simulation world
        Gate.nextID += newGates.length;
        gates = gates.concat(newGates);
    }
}