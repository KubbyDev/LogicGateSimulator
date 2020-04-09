# This script generates the strings of 0s and 1s representing the microcode of
# the CPU. It generates one string for each signal. You should generate one ROM
# for each of these strings and combine them in the simulator to get the
# microcode ROM
# The generation code is really bad but it does the job (and that's the only
# thing that matters)


# Signals ----------------------------------------------------------------------


HT= "10000000000000000" # Halt
AI= "01000000000000000" # A register in
BI= "00100000000000000" # B register in
AO= "00010000000000000" # A register out
SU= "00001000000000000" # Subtract (sum = a-b instead of a+b)
SO= "00000100000000000" # Sum out (sum = a+b or a-b)
MI= "00000010000000000" # Memory address register in (4 first bits of the bus)
RI= "00000001000000000" # RAM in
RO= "00000000100000000" # RAM out
II= "00000000010000000" # Instruction register in
IO= "00000000001000000" # Instruction register out (4 last bits to 4 first bits of the bus)
CE= "00000000000100000" # Counter enable (increments program counter)
CI= "00000000000010000" # Counter in (Jump)
CO= "00000000000001000" # Counter out
OI= "00000000000000100" # Output in
FI= "00000000000000010" # Flags in
IE= "00000000000000001" # Instruction end (resets the microcode counter)


# Instructions -----------------------------------------------------------------


# These two clock cycles are executed before any instruction
fetch = [
    [CO,MI],
    [II,RO,CE],
]

# List of possible instructions
instructions = {
    # NOP          No operation
    "0000": [
    ],
    # HLT          Halts
    "0001": [
        [HT],
    ],
    # ADD addr     Adds the contents of the address to the A register
    "0010": [
        [IO,MI],
        [RO,BI],
        [SO,AI,FI],
    ],
    # ADI value    Adds the given value (4 bits) to the A register
    "0011": [
        [IO,BI],
        [SO,AI,FI],
    ],
    # OUT          Outputs the value of the A register
    "0100": [
        [AO,OI],
    ],
    # OTR addr     Outputs the contents of the given address
    "0101": [
        [IO,MI],
        [RO,OI],
    ],
    # SUB addr     Subtracts the contents of the address from the A register
    "0110": [
        [IO,MI],
        [RO,BI],
        [SO,AI,SU,FI],
    ],
    # SBI value    Subtracts the given value (4 bits) from the A register
    "0111": [
        [IO,BI],
        [SO,AI,SU,FI],
    ],
    # JMP value    Jumps to the given line
    "1000": [
        [IO,CI],
    ],
    # JPC value    Jumps to the given line if the carry flag is set
    "1001 F 01": [
        [IO,CI],
    ],
    "1001 F 11": [
        [IO,CI],
    ],
    # JPZ value    Jumps to the given line is the zero flag is set
    "1010 F 10": [
        [IO,CI],
    ],
    "1010 F 11": [
        [IO,CI],
    ],
    # JPA          Jumps to the address stored in the A register
    "1011": [
        [AO,CI],
    ],
    # LDA addr     Loads the contents of the given address in the A register
    "1100": [
        [IO,MI],
        [RO,AI],
    ],
    # LDI value    Loads the given value (4 bits) in the A register
    "1101": [
        [IO,AI],
    ],
    # STA addr     Stores the value of the A register to the given address
    "1110": [
        [IO,MI],
        [AO,RI],
    ],
    # LDC          Loads the contents of the program counter to the A register
    "1111": [
        [CO,AI]
    ],
}

end = [
    [IE],
]

# Config -----------------------------------------------------------------------


stepCodeBits = 3
instCodeBits = 4
flagBits = 2
signalCount = len(HT)


# Generation code --------------------------------------------------------------


def binary(n, padding):
    return bin(n).replace("0b","").zfill(padding)


# Does a logic OR between the signals
def combine(signals):
    cmb = '0'*signalCount
    for i in range(signalCount):
        for signal in signals:
            if signal[i] == '1':
                cmb = strReplace(cmb, '1', i)
                break
    return cmb


def strReplace(str, chr, index):
    return str[:index] + chr + str[index+1:]


res = []  

flagTotal = 2**flagBits
instTotal = 2**instCodeBits
stepTotal = 2**stepCodeBits

for instIndex in range(instTotal):
    for flagIndex in range(flagTotal):
    
        cycles = fetch[:]
        opcode = binary(instIndex,instCodeBits)
        opcodeflags = opcode + " F " + binary(flagIndex,flagBits)
        if opcode in instructions: cycles += instructions[opcode]
        if opcodeflags in instructions: cycles += instructions[opcodeflags]
        cyclesCount = len(cycles)
        if cyclesCount < stepTotal:
            cycles += end
            cyclesCount += 1
            
        for stepIndex in range(stepTotal):

            if stepIndex >= cyclesCount:
                res.append('0'*signalCount)
            else:
                res.append(combine(cycles[stepIndex]))

print("Contents:")
for word in res:
    print(word)

individual = [""]*signalCount
for word in res:
    for i in range(signalCount):
        individual[i] += word[i]

print("")
print("Individual ROMs:")
print("")
for rom in individual:
    print(rom)
    print("")
    

















