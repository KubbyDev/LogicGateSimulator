# This script compiles assembler code and outputs the binary to put in the RAM
# You can add comments using at the beginning of the comment
# When the output contains ---- it means these bits don't matter (ignored)

# Instructions:
# NOP          No operation
# HLT          Halts
# ADD addr     Adds the contents of the address to the A register
# ADI value    Adds the given value (4 bits) to the A register
# OUT          Outputs the value of the A register
# OTR addr     Outputs the contents of the given address
# SUB addr     Subtracts the contents of the address from the A register
# SBI value    Subtracts the given value (4 bits) from the A register
# JMP value    Jumps to the given line
# JPC value    Jumps to the given line if the carry flag is set
# JPZ value    Jumps to the given line is the zero flag is set
# JPA          Jumps to the address stored in the A register
# LDA addr     Loads the contents of the given address in the A register
# LDI value    Loads the given value (4 bits) in the A register
# STA addr     Stores the value of the A register to the given address
# LDC          Loads the contents of the program counter to the A register

# Addresses and values are in decimal by default. Prefix by a $ for hexadecimal,
# prefix by a % for binary


import sys
import os


# Dict of all the possible instructions. The first element is the opcode,
# the second is the number of arguments
instructions = {"NOP":("0000",0),"HLT":("0001",0),"ADD":("0010",1),
                "ADI":("0011",1),"OUT":("0100",0),"OTR":("0101",1),
                "SUB":("0110",1),"SBI":("0111",1),"JMP":("1000",1),
                "JPC":("1001",1),"JPZ":("1010",1),"JPA":("1011",0),
                "LDA":("1100",1),"LDI":("1101",1),"STA":("1110",1),
                "LDC":("1111",0)}
line = ""
lineNumber = 0


def error(message):
    raise Exception("Could not assemble line %i: %s\n%s" % (lineNumber+1, line, message))


def assemble_param(param):
    paramInt = 0
    # Converts the number to an integer
    try:
        if param[0] == "$": paramInt = int(param[1:], 16)
        elif param[0] == "%": paramInt = int(param[1:], 2)
        else: paramInt = int(param)
    except:
        error("Couldn't parse number %s" % param) 
    if paramInt < -8 or paramInt > 15: error("%s = %i cannot be encoded on 4 bits" % (param, paramInt))
    # Adds 16 if the number is negative (same effect as taking the 2s complement)
    if paramInt < 0: paramInt += 16
    return bin(paramInt).replace("0b", "").zfill(4)


def assemble_line(line):
    inst = line[:3].upper()
    param = line[3:]
    if inst not in instructions: error("Unknown instruction: %s" % inst)
    opcode, params = instructions[inst]
    if len(param) > 0 and params == 0: error("%s takes no parameter (given %s)" % (inst, param))
    if len(param) == 0 and params == 1: error("%s takes a parameter" % inst)
    return opcode + " " + ("----" if params == 0 else assemble_param(param))


# Reads the input
path = sys.argv[1] if len(sys.argv) == 2 else input("Path of the asm file: ")
file = open(path, "r")
code = file.read()
file.close()

# Preprocesses the lines:
# removes all spaces, tabs and comments
# removes empty lines
lines = []
tmplines = code.split('\n')
for line in tmplines:
    line = line.replace(' ','').replace('\t', '').replace('\r', '')
    if '#' in line: line = line[:line.find('#')]
    if line == "": continue
    lines.append(line)

# Assembles each line
linesCount = len(lines)
res = ""
while lineNumber < linesCount:
    line = lines[lineNumber]
    res += assemble_line(line) + "\n"
    lineNumber += 1

# Prints the results
print(res, end='')



