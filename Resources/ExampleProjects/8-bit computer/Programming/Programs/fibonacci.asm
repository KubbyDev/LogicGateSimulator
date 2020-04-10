LDI 0
STA 15 # nminus2 = 0
LDI 1

# Computes the next term
STA 14 # nminus1 = a
ADD 15 # a += nminus2 

OUT

# nminus2 = nminus1
STA 13 # tmp = a
LDA 14 # a = nminus1
STA 15 # nminus2 = a
LDA 13 # a = tmp

JPC 0  # Jumps to line 1 if the maximum was reached
JMP 3  # Jumps to line 6
