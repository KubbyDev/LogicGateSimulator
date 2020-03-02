# Computer parts

## 1b Memory

A memory unit with a capacity of 1 bit.
WriteEN (Write Enable) is the control. When this pin is high, DataIN is read and stored.
DataOUT is the value of the stored bit.  
```
1b MEM;DataIN&WriteEN;DataOUT$2;NOR$5$3&NOR$2$6&NOT$0&AND$4$1&AND$0$1
```

## 1 Byte Memory

A memory unit with a capacity of 1 byte (8 bits).
WE (Write Enable) is the control. When this pin is high, I0-7 are read and stored.
CS (Chip Select) controls whether or not the memory unit should output the stored byte.
O0-7 are the values of the 8 stored bits.  
```
1B MEM;I0&I1&I2&I3&I4&I5&I6&I7&WE&CS;O0$50&O1$51&O2$52&O3$53&O4$54&O5$55&O6$56&O7$57;NOR$13$11&NOR$10$14&NOT$0&AND$12$8&AND$0$8&NOR$18$16&NOR$15$19&NOT$2&AND$17$8&AND$2$8&NOR$23$21&NOR$20$24&NOT$3&AND$22$8&AND$3$8&NOR$28$26&NOR$25$29&NOT$4&AND$27$8&AND$4$8&NOR$33$31&NOR$30$34&NOT$5&AND$32$8&AND$5$8&NOR$38$36&NOR$35$39&NOT$6&AND$37$8&AND$6$8&NOR$43$41&NOR$40$44&NOT$1&AND$42$8&AND$1$8&NOR$48$46&NOR$45$49&NOT$7&AND$47$8&AND$7$8&AND$10$9&AND$40$9&AND$15$9&AND$20$9&AND$25$9&AND$30$9&AND$35$9&AND$45$9
```

## 7 segments decoder

A decoder made to be connected to a 7 segments display
The 4 inputs are the input number in binary (Q0 is the least significant bit), the 7 outputs are the segments of the display (T = TOP, L = LEFT, R = RIGHT, B = BOTTOM, M = MIDDLE)  
```
7 SEG;Q0&Q1&Q2&Q3;T$19&TR$28&BR$35&B$45&BL$49&TL$55&M$61;AND$3$36&AND$4$39&AND$0$2&AND$6$40&AND$0$1&AND$8$39&AND$34$39&AND$10$40&AND$2$36&AND$12$40&AND$2$36&AND$14$40&OR$7$17&AND$1$18&OR$2$40&OR$16$22&OR$3$39&AND$20$34&OR$21$5&XNOR$0$1&AND$23$40&AND$0$3&OR$24$27&AND$25$36&OR$26$30&OR$34$40&AND$29$39&XOR$2$3&OR$31$33&AND$0$40&NOT$0&OR$32$37&NOT$1&AND$36$38&OR$0$40&NOT$2&NOT$3&XOR$0$1&AND$41$2&AND$3$36&OR$42$9&OR$44$46&OR$43$11&OR$1$2&AND$47$3&OR$48$50&AND$34$51&OR$1$39&OR$1$39&AND$52$3&OR$53$13&OR$54$57&OR$2$36&AND$56$34&OR$0$39&AND$58$3&OR$59$15&OR$60$62&AND$1$63&OR$34$39
```
