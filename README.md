# Logic Gate Simulator

intro

Try it out: [https://kubbydev.github.io/LogicGateSimulator/](https://kubbydev.github.io/LogicGateSimulator/)

## Demo

## Installation

## How to use it

There are 3 modes:

- Build to create, move or destroy gates  
- Wiring to make connections between gates  
- Interaction to interact with some gates (switch between states or get information)

You can switch between modes by clicking on the buttons on the top center of the screen or by pressing B (build), W (wiring) or I (interaction).

### Build mode

When build mode is activated, you have a menu on the right with a list of all the gates you can create. To create a gate, click on it and click again at the place where you want it to go. This menu contains basic gates (AND, OR, NOT, XOR, NAND...), but also some special gates (they will be explained later) and custom gates (they will be explained later too).  
You can also grab an already placed gate by clicking on it, then click again to place it or click on Destroy to destroy it.

### Wiring mode

When wiring mode is activated, you can click on a gate to start a wire, and click on another gate to end it. If you click on the right side of the gate, the output of the gate will be selected, and the inputs if you click on the left side. Click at a point where there is nothing to cancel a wire. You can use Nodes to redirect or split wires (Node is a gate available in the gates list but it transfers current instantaneously).

### Interaction mode

When interaction mode is activated, you can click on a gate to interact with it. Interactions will be detailed later, but in general you can either change the state of the gate (switches, clocks...), or get information about it (custom gates, clocks...).

### Special gates

Clock:  
The clock will change its output every x frames (1 second = 100 frames). It cannot take any input. If you click on it in Interaction mode you can change the number of frames between 2 state changes and the current counter (Setting the counter can be useful to synchronise clocks while the simulator is paused).

Input:  
Click on it to switch between on and off (Also used to mark inputs of custom gates).

Output:  
Does nothing and does not have an output. It can be used as a sort of light bulb (Its real use is to mark outputs of custom gates).

Switch:  
Click on it to toggle between open and closed.

### Custom gates

Custom gates are like boxes that hide a circuit. They are simulated as if the internal circuit of the gate was in the simulator itself. To create a custom gate, place input and output gates and connect them via some circuit. The input gates will be the inputs of the custom gate and the output gate will be its outputs. Then, in build mode, click create custom gate on the bottom left of the screen. You can then choose the name of your gate and the names of its inputs and outputs. Then click done and the simulator will give you the code to generate your custom gate and generate one automatically. You are then able to generate your custom gate with the "Custom" button in the gates list.
You can get the generation code of a custom gate by clicking on it in Interaction mode.








A simulator to design and test logic gates circuits. It can handle all basic gates, clocks with custom periods, switches etc...  

Cycles can be formed in the circuits, openning the way for circuits containing latches for examples.  


![Simulator](https://i.imgur.com/azMWKRQ.jpg)

The simulator gives an important feature: custom gates. If you place inputs and outputs around your circuit and press Create Custom Gate, you can create a single square that hides all the gates of your circuit (The RS is a custom gate on the image above).  
The simulator will give you a save of your custom gate as a string, so you can save it and place it later with the custom gate button on the bottom of the gates list.

This image represents the circuit of a 7 segments display and its use

![Seven Segments](https://i.imgur.com/nR4tC1C.png)

The simulator lacks 2 important features that can be implemented in the future:
- A possibility to save circuits (for the moment the only way to do that is to make a custom gate)
- A possibility to edit custom gates (could be solved by saving feature).
