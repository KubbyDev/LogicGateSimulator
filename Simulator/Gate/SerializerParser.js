class SerializerParser {

    // Parsing ---------------------------------------------------------------------------------------------------------

    /*** Creates a Custom gate from the data string
     * Format: Name;input_1&...&input_n;output_1&...&output_n;intern_1&...&intern_n
     * Input: Name
     * Output: Name§input_1_index§...§input_n_index
     * InternGate: Type@param_2@...@param_n§input_1_index§...§input_n_index */
    static parseCustomGate(rawData) {

        let customGate = new CustomGate();
        customGate.type = "CUSTOM";
        customGate.string = rawData;

        const parts = rawData.split(';');

        // Inputs decoding
        const inputsData = parts[1].split('&').filter(data => data !== "");
        for(let i = 0; i < inputsData.length; i++) {
            let input = new Gate();
            input.name = inputsData[i];
            customGate.inputGates[i] = input;
        }
        customGate.maxInputs = inputsData.length;

        // Outputs decoding
        const outputsData = parts[2].split('&').filter(data => data !== "");
        for(let i = 0; i < outputsData.length; i++) {
            const data = outputsData[i].split('§');
            let output = GateFactory.NODE(0,0);
            output.name = data[0];
            customGate.outputGates[i] = output;
        }

        // Intern gates decoding
        const gatesData = parts[3].split('&').filter(data => data !== "");
        for(let i = 0; i < gatesData.length; i++) {
            const gateParameters = gatesData[i].split('§')[0].split('@');
            //Calls the function that has the name corresponding to the type of the gate in GateFactory
            customGate.internGates[i] = GateFactory[gateParameters[0]](0,0);
            customGate.internGates[i].parseParameters(gateParameters);
        }

        // Connexions decoding
        function connect(gate, data) {

            // For each index in the data
            for(let i = 1; i < data.length; i++) {
                if(data[i] !== '') // if the index is not empty
                    // Creates a connection to an input if the index refers to an input, otherwise to an intern gate
                    gate.inputs[i-1] = new Connection(gate, data[i] < customGate.maxInputs
                        ? customGate.inputGates[data[i]]
                        : customGate.internGates[data[i] - customGate.maxInputs]);
            }
        }

        //Outputs
        for(let i = 0; i < outputsData.length; i++) {
            const data = outputsData[i].split('§').filter(data => data !== "");
            connect(customGate.outputGates[i], data);
        }
        //InternGates
        for(let i = 0; i < gatesData.length; i++) {
            let data = gatesData[i].split('§').filter(data => data !== "");
            connect(customGate.internGates[i], data);
        }

        customGate.maxOutputs = customGate.outputGates.length;
        return customGate
            .setGraphicProperties(
                mouseX, mouseY,
                100, 30+Math.max(customGate.maxInputs,customGate.maxOutputs)*20,
                "#379f1f", parts[0]
            );
    }

    // Serialization ---------------------------------------------------------------------------------------------------

    /*** Serializes all the gates in the simulator world
     * Format: Name;input_1&...&input_n;output_1&...&output_n;intern_1&...&intern_n
     * Input: Name
     * Output: Name§input_1_index§...§input_n_index
     * InternGate: Type@param_2@...@param_n§input_1_index§...§input_n_index */
    static serializeCustomGate(name, inputNames, outputNames) {

        // Saves the current state of the simulator to be able to edit this custom gate later
        SimulatorState.save(name);

        let data = "";

        // Breaks a custom gate (transfers all the intern gates in the simulator world)
        function breakCustomGate(customGate) {

            // For each gate in the intern gates or in the output gates
            for(let gate of customGate.internGates.concat(customGate.outputGates)) {

                // Rewires the connections that goes to an input of the custom gate
                // to the gate the input is connected to
                for (let i = 0; i < gate.maxInputs; i++) {

                    if(gate.inputs[i] === undefined || gate.inputs[i] === null)
                        continue;

                    let inputIndex = customGate.inputGates.indexOf(gate.inputs[i].destination);

                    // If the connection goes to an input of the CustomGate
                    if (inputIndex !== -1) { // Connects to the destination of the corresponding input
                        if(customGate.inputs[inputIndex])
                            gate.inputs[i].destination = customGate.inputs[inputIndex].destination;
                        else
                            gate.inputs.splice(i, 1); // Removes the ith element
                    }

                    // If it goes to another intern gate or to nothing, no problem
                }

                gates.push(gate);
            }
        }

        // Removes lastToRemove if it exists and adds separator
        function addSeparator(lastToRemove, separator) {

            if(data[data.length-1] === lastToRemove)
                data = data.substring(0,data.length-1) + separator;
            else
                data += separator;
        }

        // This function returns the index of the gate in parameter
        // The indices start with the inputs (indices 0 to the number of inputs -1)
        // Then the intern gates. The outputs have no index because no gate is connected to them
        // Returns -1 if the gate has not been found
        function getIndex(g) {

            let isInput = g instanceof Input;
            let currentIndex = isInput ? 0 : inputNames.length;

            for(let i = 0; i < gates.length; i++) {

                // If the gate is found, returns the index
                if(gates[i] === g)
                    return currentIndex;

                if(isInput) { // If we are searching for inputs

                    // If the gate is an input but not the one searched, increments the index
                    if(gates[i] instanceof Input)
                        currentIndex++;
                }
                else { // If we are searching for an intern gate

                    // If it is an input or an output, ignores it. Otherwise, increments the index
                    if(!(gates[i] instanceof Output) && !(gates[i] instanceof Input))
                        currentIndex++;
                }
            }

            return -1;
        }

        // Saves the number of gates before breaking the custom gates
        let previousLength = gates.length;
        // Breaks all the custom gates (transfers their intern gates to the simulator world)
        for(let i = 0; i < previousLength; i++)
            if(gates[i] instanceof CustomGate)
                breakCustomGate(gates[i]);

        // Deletes all the custom gates from the list and sorts them
        // by decreasing height (increasing y) so the inputs and the outputs are in the right order
        gates = gates.filter(g => !(g instanceof CustomGate)).sort((a,b) => a.y - b.y);

        data = name + ';';

        //Inputs
        for(let inputName of inputNames)
            data += inputName + '&';

        addSeparator('&', ';');

        //Outputs
        let index = 0;
        for(let gate of gates) {

            if (gate instanceof Output) {

                data += outputNames[index] + '§';
                for (let input of gate.inputs)
                    data += (input ? getIndex(input.destination) : "NULL") + '§';
                index++;

                addSeparator('§', '&');
            }
        }

        addSeparator('&', ';');

        //Intern Gates
        for(let gate of gates) {

            if (!(gate instanceof Output) && !(gate instanceof Input)) {

                data += gate.type + gate.serializeParameters() + '§';
                for (let input of gate.inputs)
                    data += (input ? getIndex(input.destination) : "NULL") + '§';
                index++;

                addSeparator('§', '&');
            }
        }

        addSeparator('&', '');

        gates = [];

        return data;
    }
}