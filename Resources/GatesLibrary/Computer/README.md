# 1b Memory

A memory unit with a capacity of 1 bit.
WriteEN (write enable) is the control. When this pin is high and DataIN is read and stored.
DataOUT is the value of the stored bit.  
1b MEM;DataIN&WriteEN;DataOUT$2;NOR$5$3&NOR$2$6&NOT$0&AND$4$1&AND$0$1
