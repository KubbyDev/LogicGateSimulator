# Logic Gate Simulator

A simulator made to design and test logic gates circuits. This simulator can handle all basic gates, clocks, custom gates etc... Cycles can be formed in the circuits, openning the way for circuits containing latches for example.  
This simulator was made in JavaScript so no installation is required.  
Try it out: [https://kubbydev.github.io/LogicGateSimulator/](https://kubbydev.github.io/LogicGateSimulator/)

This link leads to the generated version of the code (the version that went through Babel and a JavaScript minifier). The source code can be found in the Simulator folder in the git repository's root.  
Resources containing pre-made custom gates and example projects can be found in the Resources folder in the git repository's root. 

![Demo](https://i.imgur.com/zIkdO9B.jpg)

## User manual

The simulator is designed to be as simple and easy to use as possible, but a user manual is always helpful.

There are 3 modes:

- Build: Create, move or destroy gates  
- Wiring: Make connections between gates  
- Interaction: Interact with some gates (switch between states or get information)

To switch between modes, one can click on the buttons on the top center of the screen or press B (build), W (wiring) or I (interaction).

### Build mode

When build mode is activated, there is a menu on the right with a list of all the gates that can be created. A gate can be created by clicking on it in the menu, and then clicking where the gate is desired to be. This menu contains basic gates (AND, OR, NOT, XOR, NAND...), and also some special gates and custom gates that will be explained later.  
A gate can be destroyed by moving it on the Destroy button of by pressing Del with the gate selected.  
Common gates can be placed with hotkeys: A (AND), O (OR), N (NOT), X (XOR)  
The last gate that was placed can be placed again by pressing Space.

### Wiring mode

When wiring mode is activated, one can start a wire by clicking on a gate input or output, and click on another gate to end it. A wire can be canceled by clicking where there is nothing.  
Nodes can be used to redirect or split wires (Node is a gate available in the gates list but it transfers current instantaneously while other gates take one frame to update).

### Interaction mode

When interaction mode is activated, one can click on a gate to interact with it. Interactions will be detailed later, but in general they will either change the state of the gate (switches, clocks...), or get information about it (custom gates, clocks...).

### Special gates

**Clock:**  
The clock will change its output every x frames (1 second = 1000 frames). It cannot take any input. Clicking on it in Interaction mode will open a popup to change the number of frames between 2 state changes and the current counter (Setting the counter can be useful to synchronise clocks while the simulator is paused).

**Input:**  
Clicking on it will switch between on and off (Also used to mark inputs of custom gates).

**Output:**  
Does nothing and does not have an output. It can be used as a sort of LED (Its real use is to mark outputs of custom gates).

**Switch:**  
Clicking on it will toggle between opened and closed.

### Custom gates

Custom gates are boxes that hide a circuit. They are simulated as if the internal circuit of the gate was in the simulator itself.  
To create a custom gate, one can place input and output gates and connect them via some circuit. The input gates will be the inputs of the custom gate and the output gates will be its outputs. When the circuit is done, one can click create custom gate on the bottom left of the screen (in build mode) to start the custom gate generation process. This button will open a popup where the name of the gate and the names of its inputs and outputs can be chosen. When Done is clicked the simulator will display the code to generate the custom gate and generate one automatically.  
The generation code of the gate can also be found by clicking on the gate in Interaction mode. The gate can then be generated as many times as needed with the Custom button in the gates list (in build mode). Generation codes can also be saved and shared as they are not dependant of a simulator instance.  
Here is an example of a custom gate. On the left there is the circuit with 4 inputs and 7 outputs. On the right the green square is the generated gate with the 4 inputs and the 7 outputs.
![Seven Segments](https://i.imgur.com/nR4tC1C.png)