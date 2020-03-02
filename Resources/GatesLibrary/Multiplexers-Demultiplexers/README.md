# Multiplexers / Demultiplexers

## Multiplexer

A gate that copies A on O if S is low and B on O if S is high
```
MUX;A&B&S;O$5;AND$0$4&NOT$2&OR$3$6&AND$1$2
```

## Multiplexer 4

A multiplexer but with 4 inputs. The selected input is the ith input from the top, i being the binary number formed by S0 and S1
```
MUX4;A&B&C&D&S0&S1;O$16;AND$0$7&NOT$4&OR$6$9&AND$1$4&AND$2$11&NOT$4&OR$10$13&AND$3$4&AND$8$15&NOT$5&OR$14$17&AND$12$5
```

## Multiplexer 8

A multiplexer but with 8 inputs. The selected input is the ith input from the top, i being the binary number formed by S0, S1 and S2
```
MUX8;A&B&C&D&E&F&G&H&S0&S1&S2;O$25;AND$0$12&NOT$8&OR$11$14&AND$1$8&AND$2$16&NOT$8&OR$15$18&AND$3$8&AND$13$20&NOT$9&OR$19$22&AND$17$9&AND$21$24&NOT$10&OR$23$26&AND$37$10&AND$4$28&NOT$8&OR$27$30&AND$5$8&AND$6$32&NOT$8&OR$31$34&AND$7$8&AND$29$36&NOT$9&OR$35$38&AND$33$9
```

## Demultiplexer

A gate that copies I on A if S is low and I on B if S is high
```
DEMUX;I&S;A$2&B$4;AND$0$3&NOT$1&AND$0$1
```

## Demultiplexer 4

A demultiplexer but with 4 outputs. The selected output is the ith output from the top, i being the binary number formed by S0 and S1
```
DEMUX4;I&S0&S1;A$6&B$8&C$9&D$11;AND$0$4&NOT$2&AND$0$2&AND$3$7&NOT$1&AND$3$1&AND$5$10&NOT$1&AND$5$1
```

## Demultiplexer 8

A demultiplexer but with 8 outputs. The selected output is the ith output from the top, i being the binary number formed by S0, S1 and S2
```
DEMUX8;I&S0&S1&S2;A$7&B$9&C$10&D$12&E$16&F$18&G$19&H$21;AND$22$5&NOT$2&AND$22$2&AND$4$8&NOT$1&AND$4$1&AND$6$11&NOT$1&AND$6$1&AND$24$14&NOT$2&AND$24$2&AND$13$17&NOT$1&AND$13$1&AND$15$20&NOT$1&AND$15$1&AND$0$23&NOT$3&AND$0$3
```
