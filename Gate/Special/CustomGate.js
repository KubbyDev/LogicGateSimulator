class CustomGate extends Gate {

    //Proprietes fonctionnelles ----------------------------------------------------------------------------------------

    internGates = []; //Liste des portes contenues dans cette CustomGate
    inputGates = [];  //Liste des portes qui servent d'input. Ils ne sont pas presents dans internGates
    outputGates = []; //Liste des Nodes qui servent d'output. Ils ne sont pas presents dans internGates
    string;

    update() {

        //Recupere les valeurs d'entrees et les met dans les inputGates
        for(let i = 0; i < this.inputGates.length; i++)
            this.inputGates[i].output = this.inputs[i] && this.inputs[i].getValue();

        for(let gate of this.internGates)
            gate.update();
    }

    tickEnd() {
        for(let gate of this.internGates)
            gate.tickEnd();
    }

    /***
     * Renvoie la porte correspondante pour un numero d'output donne
     */
    getGateForOutput(index) {
        return this.outputGates[index];
    }

    /***
     * Renvoie l'index du connecteur le plus proche.
     * Si c'est un input l'index sera positif (1 et +), negatif si c'est un output (-1 et -)
     * @param x
     * @param y
     */
    getConnector(x,y) {

        if(x > this.x || this.maxInputs < 1) { //Si on est sur la droite de la porte ou qu'elle n'a pas d'inputs

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

    /***
     * Cree une CustomGate a partir du string qui lui est donne
     * Format: Name;input_1&...&input_n;output_1&...&output_n;intern_1&...&intern_n
     * Input: Name
     * Output: Name§input_1_index§...§input_n_index
     * InternGate: Type@param_2@...@param_n§input_1_index§...§input_n_index
     * @param rawData
     */
    static parse(rawData) {

        let customGate = new CustomGate();
        customGate.string = rawData;

        let parts = rawData.split(';');

        //Decodage des inputs
        let inputsData = parts[1].split('&').filter(data => data !== "");
        for(let i = 0; i < inputsData.length; i++) {
            let input = new Gate();
            input.name = inputsData[i];
            customGate.inputGates[i] = input;
        }
        customGate.maxInputs = inputsData.length;

        //Decodage des outputs
        let outputsData = parts[2].split('&').filter(data => data !== "");
        for(let i = 0; i < outputsData.length; i++) {
            let data = outputsData[i].split('§');
            let output = Basic.NODE(0,0);
            output.name = data[0];
            customGate.outputGates[i] = output;
        }

        //Decodage des internGates
        let gatesData = parts[3].split('&').filter(data => data !== "");
        for(let i = 0; i < gatesData.length; i++) {
            let gateParameters = gatesData[i].split('§')[0].split('@');
            customGate.internGates[i] = Basic[gateParameters[0]](0,0);
            customGate.internGates[i].parseParameters(gateParameters);
        }

        //Decodage des connexions
        function connect(gate, data) {

            //Pour chaque index dans les donnees
            for(let i = 1; i < data.length; i++) {
                if(data[i] !== '') //Si l'index n'est pas vide
                    //On cree une connection qui amene vers un input si l'index fait reference a un input sinon vers une internGate
                    gate.inputs[i-1] = new Connection(gate, data[i] < customGate.maxInputs
                        ? customGate.inputGates[data[i]]
                        : customGate.internGates[data[i] - customGate.maxInputs]);
            }
        }

        //Outputs
        for(let i = 0; i < outputsData.length; i++) {
            let data = outputsData[i].split('§').filter(data => data !== "");
            connect(customGate.outputGates[i], data);
        }
        //InternGates
        for(let i = 0; i < gatesData.length; i++) {
            let data = gatesData[i].split('§').filter(data => data !== "");
            connect(customGate.internGates[i], data);
        }

        return customGate
            .setGraphicProperties(mouseX, mouseY,100,30+Math.max(customGate.maxInputs,customGate.outputGates.length)*20,"#379f1f",parts[0]);
    }

    /***
     * Serialize l'affichage principal
     * Format: Name;input_1&...&input_n;output_1&...&output_n;intern_1&...&intern_n
     * Input: Name
     * Output: Name§input_1_index§...§input_n_index
     * InternGate: Type@param_2@...@param_n§input_1_index§...§input_n_index
     */
    static serialize(name, inputNames, outputNames) {

        let data = "";

        //Casse une CustomGate (passe les internGates dans fromGates)
        function breakCustomGate(customGate) {

            //Pour chaque porte dans les outputs ou dans les internes
            for(let gate of customGate.internGates.concat(customGate.outputGates)) {

                for (let i = 0; i < gate.maxInputs; i++) {

                    let inputIndex = customGate.inputGates.indexOf(gate.inputs[i].destination);

                    //Si la connection donne sur un input de la CustomGate
                    if (inputIndex !== -1) //On se connecte a la destination de l'input correspondant sur la CustomGate
                        gate.inputs[i].destination = customGate.inputs[inputIndex].destination;
                    //Si ca donne sur une autre porte interne, aucun probleme
                }

                gates.push(gate);
            }
        }

        //Supprime le caractere lastToRemove a la fin de data si il existe
        //et ajoute le caractere separator derriere
        function addSeparator(lastToRemove, separator) {

            if(data[data.length-1] === lastToRemove)
                data = data.substring(0,data.length-1) + separator;
            else
                data += separator;
        }

        //Cette fonction renvoie l'index de la porte en parametre
        //L'indexation prend d'abord les inputs qui ont donc un index entre 0 et le nombre d'inputs
        //Puis les internGates (les outputs ne sont pas indexes parce qu'aucune porte n'y est connecte)
        function getIndex(g) {

            let isInput = g instanceof Input;
            let currentIndex = isInput ? 0 : inputNames.length;

            //On parcours toutes les portes sauf les outputs
            for(let i = 0; i < gates.length; i++) {

                //Si on a trouve la porte on renvoie l'index
                if(gates[i] === g)
                    return currentIndex;

                //Si la porte n'est pas celle qu'on cherche

                if(isInput) { //Si on cherche des inputs

                    //Si la porte trouvee est un input mais pas celui qu'on cherche on incremente
                    if(gates[i] instanceof Input)
                        currentIndex++;
                }
                else { //Si on cherche une internGate

                    //Si c'est un output on s'en fous, sinon on incremente le currentIndex
                    if(!(gates[i] instanceof Output) && !(gates[i] instanceof Input))
                        currentIndex++;
                }
            }

            return -1;
        }

        //Casse toutes les CustomGates (Passe les internGates dans fromGates)
        let previousLength = gates.length; //Enregistre la longeur de la liste avant l'ajout des portes resultantes du cassage des CustomGates
        for(let i = 0; i < previousLength; i++)
            if(gates[i] instanceof CustomGate)
                breakCustomGate(gates[i]);

        //Supprime toutes les CustomGates de la liste puis
        //range les gates par ordre de hauteur pour que les inputs et les outputs soient dans le bon ordre
        gates = gates.filter(g => !(g instanceof CustomGate)).sort((a,b) => a.y - b.y);

        data = name + ';';

        //Inputs
        for(let inputName of inputNames)
            data += inputName + '&';

        //Supprime le dernier & et rajoute un ;
        addSeparator('&', ';');

        //Outputs
        let index = 0;
        for(let gate of gates) {

            if (gate instanceof Output) {

                data += outputNames[index] + '§';
                for (let input of gate.inputs) {
                    if (input)
                        data += getIndex(input.destination) + '§';
                }
                index++;

                //Supprime le dernier § et rajoute un &
                addSeparator('§', '&');
            }
        }

        //Supprime le dernier & et rajoute un ;
        addSeparator('&', ';');

        //Intern Gates
        for(let gate of gates) {

            if (!(gate instanceof Output) && !(gate instanceof Input)) {

                data += gate.type + gate.serializeParameters() + '§';
                for (let input of gate.inputs) {
                    if (input)
                        data += getIndex(input.destination) + '§';
                }
                index++;

                //Supprime le dernier § et rajoute un &
                addSeparator('§', '&');
            }
        }

        //Supprime le dernier &
        addSeparator('&', '');

        gates = [];

        return data;
    }

    /***
     * Affiche un popup qui montre le string serialise de la porte
     */
    onClick() {

        Interface.openPopup();

        let mainDiv = document.getElementById("popup_main_div");
        let div = document.createElement("DIV");

        let separator = document.createElement("HR");
        div.appendChild(separator);

        let p = document.createElement("P");
        p.innerHTML = this.string;
        p.style.wordWrap = "break-word";
        div.appendChild(p);

        let button = document.createElement("BUTTON");
        button.addEventListener('click', Interface.closePopup);
        button.innerHTML = "OK";
        div.appendChild(button);

        mainDiv.appendChild(div);
    }

    //Proprietes graphiques --------------------------------------------------------------------------------------------

    draw() {

        //Met a jour la position des outputs pour que les connexions s'affichent correctement
        for(let i = 0; i < this.outputGates.length; i++) {

            let position = this.getOutputPosition(i);
            this.outputGates[i].x = position[0];
            this.outputGates[i].y = position[1];
        }

        super.draw();

        //Affiche les noms des inputs et outputs
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

    /***
     * Renvoie la position de l'output index sur la porte
     * @param index
     */
    getOutputPosition(index) {
        return [
            this.x + this.width/2 - Connection.WIDTH,
            this.y - this.height/2 + this.height*(index+1)/(this.outputGates.length+1)
        ]
    }

    /***
     * Affiche le menu de selection de noms des inputs/outputs pour creer une nouvelle custom gate
     */
    static openPopup() {

        Interface.openPopup();

        //Compte le nombre d'inputs et d'outputs de la Custom Gate
        let nbInputs = 0;
        let nbOutputs = 0;
        for(let gate of gates) {
            if(gate instanceof Input)
                nbInputs++;
            if(gate instanceof Output)
                nbOutputs++;
        }

        let mainDiv = document.getElementById("popup_main_div");
        let div = document.createElement("DIV");

        function addInput(name) {
            let input = document.createElement("INPUT");
            input.id = name;
            input.minlength="0";
            input.maxlength="6";
            div.appendChild(input);
        }

        function addSeparator(name) {
            let separator = document.createElement("HR");
            separator.innerHTML = name;
            div.appendChild(separator);
        }

        addSeparator("Gate name");
        addInput("name");

        //Cree les fields pour les inputs
        addSeparator("Input names");
        for(let i = 0; i < nbInputs; i++)
            addInput("input" + i);

        //Cree les fields pour les outputs
        addSeparator("Output names");
        for(let i = 0; i < nbOutputs; i++)
            addInput("output" + i);

        addSeparator("");
        let button = document.createElement("BUTTON");
        button.addEventListener('click', () => {

            //Recuperation des inputs
            let inputs = [];
            for(let i = 0; i < nbInputs; i++)
                inputs[i] = document.getElementById("input" + i).value;

            //Recuperation des outputs
            let outputs = [];
            for(let i = 0; i < nbOutputs; i++)
                outputs[i] = document.getElementById("output" + i).value;

            //Creation de la porte
            let gate = CustomGate.parse(CustomGate.serialize(document.getElementById("name").value, inputs, outputs));
            gates.push(gate);

            //Affichage de l'interface pour afficher le string serialise
            Interface.closePopup();
            gate.onClick();

            //Enregistrement de cette porte comme lastCustomGate
            BuildMode.lastCustomGate = gate.string;
        });
        button.innerHTML = "Done";
        div.appendChild(button);
        mainDiv.appendChild(div);
    }
}