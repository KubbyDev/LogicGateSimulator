# Computer parts

## 1b Memory

A memory unit with a capacity of 1 bit.
WriteEN (write enable) is the control. When this pin is high and DataIN is read and stored.
DataOUT is the value of the stored bit.  
1b MEM;DataIN&WriteEN;DataOUT$2;NOR$5$3&NOR$2$6&NOT$0&AND$4$1&AND$0$1

## 7 segments decoder

A decoder made to be connected to a 7 segments display
The 4 inputs are the input number in binary (Q0 is the least significant bit), the 7 outputs are the segments of the display (T = TOP, L = LEFT, R = RIGHT, B = BOTTOM, M = MIDDLE)  
7 SEG;Q0&Q1&Q2&Q3;T$19&TR$28&BR$35&B$45&BL$49&TL$55&M$61;AND$3$36&AND$4$39&AND$0$2&AND$6$40&AND$0$1&AND$8$39&AND$34$39&AND$10$40&AND$2$36&AND$12$40&AND$2$36&AND$14$40&OR$7$17&AND$1$18&OR$2$40&OR$16$22&OR$3$39&AND$20$34&OR$21$5&XNOR$0$1&AND$23$40&AND$0$3&OR$24$27&AND$25$36&OR$26$30&OR$34$40&AND$29$39&XOR$2$3&OR$31$33&AND$0$40&NOT$0&OR$32$37&NOT$1&AND$36$38&OR$0$40&NOT$2&NOT$3&XOR$0$1&AND$41$2&AND$3$36&OR$42$9&OR$44$46&OR$43$11&OR$1$2&AND$47$3&OR$48$50&AND$34$51&OR$1$39&OR$1$39&AND$52$3&OR$53$13&OR$54$57&OR$2$36&AND$56$34&OR$0$39&AND$58$3&OR$59$15&OR$60$62&AND$1$63&OR$34$39
