# Custom gates

## AND3
AND gate but with 3 inputs:  
AND3;A&B&C;Q§4;AND§0§1&AND§3§2

## Pulse Generator
The output is on for 2 updates on each jump of the input signal
PulseGenerator(+);I;O§4;NOT§2&NOT§3&NOT§0&AND§1§0

## RS
An RS nor latch
RS;Pre&S&Enable&R&Cle;Q§9&/Q§14;AND§0§11&AND§5§14&AND§9§12&AND§7§4&NOT§10&NODE§6&NAND§1§2&NAND§2§3&NODE§8&NOT§13

## 1b Memory
A memory unit that can store one bit of information  
1b Memory;DataIN&WE;DataOUT§4;OR§4§3&AND§0§1&AND§2§5&NOT§7&NOT§0&AND§6§1

## 7 seg display
A seven segment dislay controller  
7 seg Display;Q0&Q1&Q2&Q3;T§6&TR§10&BR§13&B§24&BL§40&TL§49&M§57;NOT§2&AND§4§3&OR§5§8&XNOR§2§0&OR§7§1&XNOR§1§0&OR§9§11&NOT§2&OR§3§2&OR§12§15&NOT§1&OR§14§0&NOT§2&AND§16§3&OR§17§20&NOT§0&AND§19§1&NOT§3&AND§21§23&NOT§2&OR§18§28&AND§22§1&AND§2§0&AND§26§29&OR§25§30&NOT§1&OR§27§32&NOT§2&AND§31§33&NOT§0&NOT§2&AND§34§36&NOT§0&OR§35§39&NOT§0&AND§38§1&OR§37§42&NOT§0&AND§41§3&NOT§1&AND§43§45&NOT§0&OR§44§48&NOT§2&AND§47§3&OR§46§52&NOT§1&AND§50§2&OR§51§54&NOT§0&AND§53§2&XOR§2§1&NOT§2&OR§55§59&AND§56§3&OR§58§61&NOT§0&AND§60§1