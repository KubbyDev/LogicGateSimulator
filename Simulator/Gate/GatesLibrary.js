// This file was generated by GenerateGatesLibraryFile.py
// It contains all the gates of the gates library (for the custom gate popup)
const gatesLibrary = [
    {name: "AND 3", code: "AND3;A&B&C;O$4;AND$0$1&AND$3$2"},
    {name: "OR 3", code: "OR3;A&B&C;O$4;OR$0$1&OR$3$2"},
    {name: "NAND 3", code: "NAND3;A&B&C;O$4;AND$0$1&NAND$3$2"},
    {name: "NOR 3", code: "NOR3;A&B&C;O$4;OR$0$1&NOR$3$2"},
    {name: "AND 4", code: "AND4;A&B&C&D;O$5;AND$0$1&AND$4$6&AND$2$3"},
    {name: "OR 4", code: "OR4;A&B&C&D;O$5;OR$0$1&OR$4$6&OR$2$3"},
    {name: "NAND 4", code: "NAND4;A&B&C&D;O$5;AND$0$1&NAND$4$6&AND$2$3"},
    {name: "NOR 4", code: "NOR4;A&B&C&D;O$5;OR$0$1&NOR$4$6&OR$2$3"},
    {name: "1b Memory", code: "1b MEM;DataIN&WriteEN;DataOUT$2;NOR$5$3&NOR$2$6&NOT$0&AND$4$1&AND$0$1"},
    {name: "1 Byte Memory", code: "1B MEM;I0&I1&I2&I3&I4&I5&I6&I7&WE&CS;O0$50&O1$51&O2$52&O3$53&O4$54&O5$55&O6$56&O7$57;NOR$13$11&NOR$10$14&NOT$0&AND$12$8&AND$0$8&NOR$18$16&NOR$15$19&NOT$2&AND$17$8&AND$2$8&NOR$23$21&NOR$20$24&NOT$3&AND$22$8&AND$3$8&NOR$28$26&NOR$25$29&NOT$4&AND$27$8&AND$4$8&NOR$33$31&NOR$30$34&NOT$5&AND$32$8&AND$5$8&NOR$38$36&NOR$35$39&NOT$6&AND$37$8&AND$6$8&NOR$43$41&NOR$40$44&NOT$1&AND$42$8&AND$1$8&NOR$48$46&NOR$45$49&NOT$7&AND$47$8&AND$7$8&AND$10$9&AND$40$9&AND$15$9&AND$20$9&AND$25$9&AND$30$9&AND$35$9&AND$45$9"},
    {name: "7 segments decoder", code: "7 SEG;Q0&Q1&Q2&Q3;T$19&TR$28&BR$35&B$45&BL$49&TL$55&M$61;AND$3$36&AND$4$39&AND$0$2&AND$6$40&AND$0$1&AND$8$39&AND$34$39&AND$10$40&AND$2$36&AND$12$40&AND$2$36&AND$14$40&OR$7$17&AND$1$18&OR$2$40&OR$16$22&OR$3$39&AND$20$34&OR$21$5&XNOR$0$1&AND$23$40&AND$0$3&OR$24$27&AND$25$36&OR$26$30&OR$34$40&AND$29$39&XOR$2$3&OR$31$33&AND$0$40&NOT$0&OR$32$37&NOT$1&AND$36$38&OR$0$40&NOT$2&NOT$3&XOR$0$1&AND$41$2&AND$3$36&OR$42$9&OR$44$46&OR$43$11&OR$1$2&AND$47$3&OR$48$50&AND$34$51&OR$1$39&OR$1$39&AND$52$3&OR$53$13&OR$54$57&OR$2$36&AND$56$34&OR$0$39&AND$58$3&OR$59$15&OR$60$62&AND$1$63&OR$34$39"},
    {name: "Merge", code: "MERGE;A0&A1&A2&A3&A4&A5&A6&A7&B0&B1&B2&B3&B4&B5&B6&B7;O0$16&O1$17&O2$18&O3$19&O4$20&O5$21&O6$22&O7$23;OR$0$8&OR$1$9&OR$2$10&OR$3$11&OR$4$12&OR$5$13&OR$6$14&OR$7$15"},
    {name: "Adder", code: "ADD;A&B&Cin;R$4&Cout$6;XOR$0$1&XOR$3$2&AND$0$1&OR$5$7&AND$3$2"},
    {name: "SR latch", code: "SR;R&S;Q$2&/Q$3;NOR$0$3&NOR$2$1"},
    {name: "JK flip flop", code: "JK;/PRE&J&CLK&K&/CLE;Q$6&/Q$8;AND$0$10&NAND$5$8&AND$6$13&NAND$7$4&AND$4$1&NAND$9$11&AND$2$8&AND$6$2&NAND$12$14&AND$3$0"},
    {name: "JK (Synchronised on rising edges)", code: "JK RIS;/PRE&J&CLK&K&/CLE;Q$10&/Q$12;AND$2$8&NOT$2&NOT$6&NOT$7&AND$0$14&NAND$9$12&AND$10$17&NAND$11$4&AND$4$1&NAND$13$15&AND$5$12&AND$10$5&NAND$16$18&AND$3$0"},
    {name: "JK Master-Slave", code: "JK MSTSLV;/PRE&J&CLK&K&/CLE;Q$24&/Q$26;AND$2$8&NOT$2&NOT$6&NOT$7&AND$0$14&NAND$9$12&AND$10$17&NAND$11$4&AND$4$1&NAND$13$15&AND$5$12&AND$10$5&NAND$16$18&AND$3$0&AND$33$22&NOT$33&NOT$20&NOT$21&AND$0$28&NAND$23$26&AND$24$31&NAND$25$4&AND$4$10&NAND$27$29&AND$19$26&AND$24$19&NAND$30$32&AND$12$0&NOT$2"},
    {name: "D latch", code: "D;D&E;Q$2&/Q$3;NOR$4$3&NOR$2$6&AND$1$5&NOT$0&AND$1$0"},
    {name: "D  (Synchronised on rising edges)", code: "D RIS;D&CLK;Q$2&/Q$3;NOR$4$3&NOR$2$6&AND$7$5&NOT$0&AND$7$0&AND$1$10&NOT$1&NOT$8&NOT$9"},
    {name: "Multiplexer", code: "MUX;A&B&S;O$5;AND$0$4&NOT$2&OR$3$6&AND$1$2"},
    {name: "Multiplexer 4", code: "MUX4;A&B&C&D&S0&S1;O$16;AND$0$7&NOT$4&OR$6$9&AND$1$4&AND$2$11&NOT$4&OR$10$13&AND$3$4&AND$8$15&NOT$5&OR$14$17&AND$12$5"},
    {name: "Multiplexer 8", code: "MUX8;A&B&C&D&E&F&G&H&S0&S1&S2;O$25;AND$0$12&NOT$8&OR$11$14&AND$1$8&AND$2$16&NOT$8&OR$15$18&AND$3$8&AND$13$20&NOT$9&OR$19$22&AND$17$9&AND$21$24&NOT$10&OR$23$26&AND$37$10&AND$4$28&NOT$8&OR$27$30&AND$5$8&AND$6$32&NOT$8&OR$31$34&AND$7$8&AND$29$36&NOT$9&OR$35$38&AND$33$9"},
    {name: "Demultiplexer", code: "DEMUX;I&S;A$2&B$4;AND$0$3&NOT$1&AND$0$1"},
    {name: "Demultiplexer 4", code: "DEMUX4;I&S0&S1;A$6&B$8&C$9&D$11;AND$0$4&NOT$2&AND$0$2&AND$3$7&NOT$1&AND$3$1&AND$5$10&NOT$1&AND$5$1"},
    {name: "Demultiplexer 8", code: "DEMUX8;I&S0&S1&S2;A$7&B$9&C$10&D$12&E$16&F$18&G$19&H$21;AND$22$5&NOT$2&AND$22$2&AND$4$8&NOT$1&AND$4$1&AND$6$11&NOT$1&AND$6$1&AND$24$14&NOT$2&AND$24$2&AND$13$17&NOT$1&AND$13$1&AND$15$20&NOT$1&AND$15$1&AND$0$23&NOT$3&AND$0$3"},
    {name: "Rising edge detector", code: "RIS EDGE;I;O$1;AND$0$4&NOT$0&NOT$2&NOT$3"},
    {name: "Falling edge detector", code: "FAL EDGE;I;O$1;NOR$0$4&NOT$3&NOT$0&NOT$2"},
];