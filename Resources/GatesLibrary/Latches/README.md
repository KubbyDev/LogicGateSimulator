# Latches

## SR latch

A minimal SR NOR latch  
<https://en.wikipedia.org/wiki/Flip-flop_(electronics)#SR_NOR_latch>  
SR;R&S;Q$2&/Q$3;NOR$0$3&NOR$2$1

## JK flip flop

A JK latch with clock and Preset/Clear (active low)
<https://en.wikipedia.org/wiki/Flip-flop_(electronics)#JK_latch>  
JK;/PRE&J&CLK&K&/CLE;Q$6&/Q$8;AND$0$10&NAND$5$8&AND$6$13&NAND$7$4&AND$4$1&NAND$9$11&AND$2$8&AND$6$2&NAND$12$14&AND$3$0

## JK (Synchronised on rising edges)

A JK latch that will update only when the clock turns high
JK RIS;/PRE&J&CLK&K&/CLE;Q$10&/Q$12;AND$2$8&NOT$2&NOT$6&NOT$7&AND$0$14&NAND$9$12&AND$10$17&NAND$11$4&AND$4$1&NAND$13$15&AND$5$12&AND$10$5&NAND$16$18&AND$3$0

## JK Master-Slave

A master slave JK latch
<https://www.geeksforgeeks.org/master-slave-jk-flip-flop/>
JK MSTSLV;/PRE&J&CLK&K&/CLE;Q$24&/Q$26;AND$2$8&NOT$2&NOT$6&NOT$7&AND$0$14&NAND$9$12&AND$10$17&NAND$11$4&AND$4$1&NAND$13$15&AND$5$12&AND$10$5&NAND$16$18&AND$3$0&AND$33$22&NOT$33&NOT$20&NOT$21&AND$0$28&NAND$23$26&AND$24$31&NAND$25$4&AND$4$10&NAND$27$29&AND$19$26&AND$24$19&NAND$30$32&AND$12$0&NOT$2
