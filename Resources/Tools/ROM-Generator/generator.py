import math

# TODO: This should just generate the optimal boolean equation because the input is a truth table

__paramSeparator = ";"
__gateSeparator = "&"
__inputSeparator = "$"

# Generates a read-only memory. <name> is the name of the ROM and values are the
# 0s and 1s it stores. The inputs are the address of the bit you want, the output is
# the bit stored at this address. If you want to store bytes just use 8 roms :)
# The generator tries to optimize the number of gates. The more groups of repeated bits
# the ROM contains, the lighter the generated ROM will be.
def generate_rom(name, values):

    circuit = "" # The string that will contain the circuit
    next_id = 0 # The id of the next gate that will be generated
    upGate = 0 # UP gate to use when needed (created before the circuit generation)

    # Generates the a part of a demultiplexer (the part that controls the a output)
    # <i> is the gate connected to the i input of the demux, <s> for the s connector
    # Returns the id of the gate representing the a output
    # Complete demultiplexer code: DEMUX;I&S;A$3&B$4;NOT$1&AND$0$2&AND$0$1
    def generate_demux_a(i, s):
        nonlocal circuit
        nonlocal next_id
        # Generates the circuit
        circuit += "NOT" + __inputSeparator + str(s)
        circuit += __gateSeparator
        circuit += "AND" + __inputSeparator + str(i) + __inputSeparator + str(next_id) # Connection to i and the NOT gate
        circuit += __gateSeparator
        # 2 gates were added
        next_id += 2
        # Returns the AND gate which is the output
        return next_id-1

    # Generates the b part of a demultiplexer (the part that controls the b output)
    # <i> is the gate connected to the i input of the demux, <s> for the s connector
    # Returns the id of the gate representing the b output
    # Complete demultiplexer code: DEMUX;I&S;A$3&B$4;NOT$1&AND$0$2&AND$0$1
    def generate_demux_b(i, s):
        nonlocal circuit
        nonlocal next_id
        # Generates the circuit
        circuit += "AND" + __inputSeparator + str(i) + __inputSeparator + str(s) # Connection to i and s
        circuit += __gateSeparator
        # 1 gate was added
        next_id += 1
        # Returns the AND gate which is the output
        return next_id-1
    
    # Generates a group of memory cells. <input> is the id of the gate connected
    # to the I of the demultiplexer. <addressBit> is the index of the
    # most significant of the bits that addresses this group of cells
    # Also the index of the gate that gives this address bit
    # <values> are the values of the cells in this group (0s and 1s)
    # Returns the id of the output gate of the cells group
    def generate_cells_group(input, addressBit, values):
        nonlocal circuit
        nonlocal next_id

        # If the cells group only contains 1s, replaces it with an AND gate
        if not '0' in values:
            # AND with the address selection signal
            circuit += "AND" + __inputSeparator
            circuit += str(upGate)
            circuit += __inputSeparator
            circuit += str(input) # Connection to the input
            circuit += __gateSeparator
            # 1 gate was added
            next_id += 1
            # Returns the id of the AND
            return next_id-1

        # Calculates the values to put in each cells group
        nbVal = len(values)
        leftVals = values[nbVal//2:]
        rightVals = values[:nbVal//2]

        # Doesn't generate the subgroups that contain only 0s
        genLeft = '1' in leftVals
        genRight = '1' in rightVals

        # Generates the demultiplexer to select group a or group b
        if genLeft: b = generate_demux_b(input, addressBit)
        if genRight: a = generate_demux_a(input, addressBit)

        # Generates the groups and saves their output gate
        if genLeft: cg1 = generate_cells_group(b, addressBit-1, leftVals)
        if genRight: cg2 = generate_cells_group(a, addressBit-1, rightVals)

        # Creates an OR gate to combine the outputs if needed
        if genLeft and genRight:
            circuit += "OR" + __inputSeparator + str(cg1) + __inputSeparator + str(cg2) + __gateSeparator
            next_id += 1
            # Returns the id of the OR gate (which is the output of the whole group)
            return next_id-1

        # If only one group was generated, returns its output
        if genLeft: return cg1
        if genRight: return cg2

        # If no group was generated, creates a DOWN and returns it
        # (only happens when the whole ROM contains only 0s)
        circuit += "DOWN" + __gateSeparator
        next_id += 1
        return next_id-1
        
    # Adds the name of the gate
    res = name + __paramSeparator

    # Generates the input gates
    nbAddr = round(math.log(len(values), 2))
    for i in range(nbAddr):
        res += "A" + str(i) + __gateSeparator
    if nbAddr > 0: res = res[:-1]
    res = res + __paramSeparator
    next_id += nbAddr

    # Creates an UP and a DOWN gate to use when needed
    circuit += "UP" + __gateSeparator
    upGate = next_id
    next_id += 1

    # Generates the circuit (writes in the circuit variable)
    output = generate_cells_group(
        upGate, # The first demux has no controller demux so we just tie it high
        nbAddr-1, # The MSB of the address is the number of address bits -1
        values)

    # Adds the output parameter
    res += "O" + __inputSeparator + str(output) + __paramSeparator

    # Adds the circuit without the last gate separator
    return res + circuit[:-1]

