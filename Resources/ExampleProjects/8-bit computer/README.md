# 8-bit computer

Inspired by these (excellent) videos:  
<https://www.youtube.com/watch?v=HyznrdDSSGM&list=PLowKtXNTBypGqImE405J2565dvjafglHU>

## Demo

The gif below shows the computer calculating the fibonacci sequence (accelerated x20). The values it displays are hexadecimal. It returns to 0 when the maximum is reached (when it goes above 255).  
![Computer](https://github.com/KubbyDev/LogicGateSimulator/raw/master/Resources/ExampleProjects/8-bit%20computer/Computer.gif "Computer")

This is the program that is being run:
![Program](https://i.imgur.com/QwNlpaw.png)

Steps to reproduce it:
- Download the assembler <https://raw.githubusercontent.com/KubbyDev/LogicGateSimulator/master/Resources/ExampleProjects/8-bit%20computer/Programming/assemble.py>
- Download the program <https://raw.githubusercontent.com/KubbyDev/LogicGateSimulator/master/Resources/ExampleProjects/8-bit%20computer/Programming/Programs/fibonacci.asm>
- Run the assembler and give the path of the program to get the raw binary program
- Download the computer save file <https://raw.githubusercontent.com/KubbyDev/LogicGateSimulator/master/Resources/ExampleProjects/8-bit%20computer/Computer.lgs>
- Open an empty simulator instance <https://kubbydev.github.io/LogicGateSimulator/>
- Import the save file with the import button in the top left corner
- Switch to interaction mode (press I or click on the Interaction button)
- Stop the clock by opening the switch (the orange rectangle in the top left corner of the circuit)
- Reset the computer by activating and then deactivating the input gate in the bottom left corner of the circuit (don't forget to deactivate it)
- There are 4 groups of inputs on the top center of the circuit. The first input is the run mode (ON by default), the second group is the address (MSB on the left), the third group is the data (MSB on the left), the 4th input is the write enable. Switch to programming mode (turn OFF the first input).
- The assembler gave you 8 bits instructions. For each instruction: set the address to the 4 bits before the ':', then set the data to the 8 bits after the ':', and activate then deactivate the write enable. ---- means you can chose what to put, the computer ignores it.
- Repeat for each of the instructions (you don't need to set the remaining bytes, the program does it).
- Switch back to run mode (turn ON the first input) and make sure the groups 2, 3 and 4 are all off.
- Close the clock switch you opened at the beginning (try to do it when the clock is low to avoid false starts).
- You should see everything moving and after some seconds the first value should appear

## General information

This computer was not made for performance so its circuits are not optimal, it's more like a way to show the possibilities of the simulator.

An assembler and the microcode generation script can be found in the Programming folder

Timings:
- IN signals are applied on the rising edge of the clock
- OUT signals are applied when the signal is on
- The control logic (and so the signals) are updated on the falling edge of the clock

## Some of the problems I had while building this
- **Bus problems**: The bus should connect each module with each other. In real computer this is achieved by connecting them with wires and putting tri-state buffers on the modules outputs. The simulator doesn't support tri state buffers so I just placed OR gates to combine the output of each module to the bus. But OR gates can't propagate the signal backwards, so in order for the modules on the left to communicate with the modules on the right I connected the end of the bus to its beginning. But by doing it I basically created an 8 bit memory cell because when a bus line is on it will maintain itself. So I had to add a "breaker" with some and gates and a control signal that is ON most of the time but comes low at a regular interval to reset the bus. The most appropriate moment to reset the bus is whenever the clock is low. But this caused another problem. When the control unit wants to transfer data from one module to another (on almost every clock cycle), the sender module outputs its signal when the clock is low, and then when the clock comes high, the receiver module fetches it. But if the breaker is between the two modules, it is possible that the signal still hasn't reached the receiver when it fetches the signal (because the breaker releases the signal when the clock comes high). To solve this problem, I added a signal delayer on the clock so that the breaker receives the clock 20 updates before everything else (It has the effect of putting it out of phase).