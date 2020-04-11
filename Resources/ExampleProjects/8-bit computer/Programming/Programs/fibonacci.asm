LDI 0                                # Loads 0 into the A register
STA 15 # nminus2 = 0                 # Stores the A register into the 15th RAM byte
LDI 1                                # Loads 1 into the A register
 
OUT                                  # Outputs the contents of the A register

# Computes the next term
STA 14 # nminus1 = a                 # Stores the A register into the 15th RAM byte
ADD 15 # a += nminus2                # Adds the contents of the 15th RAM byte to the A register

# nminus2 = nminus1
STA 13 # tmp = a                     # Stores the A register into the 15th RAM byte
LDA 14 # a = nminus1                 # Loads the contents of the 14th RAM byte into the A register
STA 15 # nminus2 = a                 # Stores the A register into the 15th RAM byte
LDA 13 # a = tmp                     # Loads the contents of the 13th RAM byte into the A register

JPC 0  # resets if max was reached   # Jumps to line 1 (LDI 0) if the carry flag is set

JMP 3                                # Jumps to line 5 (OUT)

