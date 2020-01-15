Try it out: [https://kubbydev.github.io/LogicGateSimulator/](https://kubbydev.github.io/LogicGateSimulator/)

A simulator to design and test logic gates circuits. It can handle all basic gates, clocks with custom periods, switches etc...  

Cycles can be formed in the circuits, openning the way for circuits containing latches for examples.  

There are 3 modes:  
- Build to place, move or destroy gates  
- Wiring to make connections between gates  
- Interaction to interact with some gates (switch between states or get information)

![Simulator](https://i.imgur.com/azMWKRQ.jpg)

The simulator gives an important feature: custom gates. If you place inputs and outputs around your circuit and press Create Custom Gate, you can create a single square that hides all the gates of your circuit (The RS is a custom gate on the image above).  
The simulator will give you a save of your custom gate as a string, so you can save it and place it later with the custom gate button on the bottom of the gates list.

This image represents the circuit of a 7 segments display and its use

![Seven Segments](https://i.imgur.com/nR4tC1C.png)

The simulator lacks 2 important features that can be implemented in the future:
- A possibility to save circuits (for the moment the only way to do that is to make a custom gate)
- A possibility to edit custom gates (could be solved by saving feature).