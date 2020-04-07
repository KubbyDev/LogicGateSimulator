# 8-bit computer

Inpired by these (excellent) videos:  
<https://www.youtube.com/watch?v=HyznrdDSSGM&list=PLowKtXNTBypGqImE405J2565dvjafglHU>

This computer was not made for performance so its circuits are not optimal, it's more like a way to show the possibilities of the simulator.

List of control signals:
HT: Halt
AI: A register in
BI: B register in
AO: A register out
SU: Subtract (sum = a-b instead of a+b)
SO: Sum out (sum = a+b or a-b)
MI: Memory address register in (4 first bits of the bus)
RI: RAM in
RO: RAM out
II: Instruction register in
IO: Instruction register out (4 last bits to 4 first bits of the bus)
CE: Counter enable (increments program counter)
CI: Counter in (Jump)
CO: Counter out
OI: Output in
FI: Flags in
IE: Instruction end (resets the microcode counter)