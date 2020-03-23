import math

# TODO:
#       There is a lot of room for optimisation in the generated code

__paramSeparator = ";"
__gateSeparator = "&"
__inputSeparator = "$"

# Generates a read-only memory. <name> is the name of the ROM and values are the
# 0s and 1s it stores. The inputs are the address of the bit you want, the output is
# the bit stored at this address. If you want to store bytes just use 8 roms :)
def generate_rom(name, values):

    circuit = "" # The string that will contain the circuit
    next_id = 0 # The id of the next gate that will be generated

    # UP and DOWN gates to use when needed (created before the circuit generation)
    upGate = 0
    downGate = 0

    # Generates a memory cell controled by the gate which has the id <input>
    # <value> is the value of this cell (0 or 1)
    # Returns the id of the output gate of the cell (the AND gate)
    def generate_cell(input, value):
        nonlocal circuit
        nonlocal next_id
        # AND with the address selection signal
        circuit += "AND" + __inputSeparator
        circuit += str(upGate) if value == '1' else str(downGate)
        circuit += __inputSeparator
        circuit += str(input) # Connection to the input
        circuit += __gateSeparator
        # 1 gate was added
        next_id += 1
        # Returns the id of the AND
        return next_id-1

    # Generates a demultiplexer
    # <i> is the gate connected to the i input of the demux, <s> for the s connector
    # Returns a tuple with the id of the gate representing the a output, then the b
    # Demultiplexer code: DEMUX;I&S;A$3&B$4;NOT$1&AND$0$2&AND$0$1
    def generate_demux(i, s):
        nonlocal circuit
        nonlocal next_id
        # Generates the circuit
        circuit += "NOT" + __inputSeparator + str(s)
        circuit += __gateSeparator
        circuit += "AND" + __inputSeparator + str(i) + __inputSeparator + str(next_id) # Connection to i and the NOT gate
        circuit += __gateSeparator
        circuit += "AND" + __inputSeparator + str(i) + __inputSeparator + str(s) # Connection to i and s
        circuit += __gateSeparator
        # 3 gates were added
        next_id += 3
        # Returns the two AND gates which are the outputs
        return (next_id-2, next_id-1)

    # Generates a group of memory cells. <input> is the id of the gate connected
    # to the I of the demultiplexer. <addressBit> is the index of the
    # most significant of the bits that addresses this group of cells
    # Also the index of the gate that gives this address bit
    # <values> are the values of the cells in this group (0s and 1s)
    # Returns the id of the output gate of the cells group
    def generate_cells_group(input, addressBit, values):
        nbVal = len(values)
        # If the cells group contains only one value, just generates a cell
        if(nbVal == 1):
            return generate_cell(input, values[0])
        # If the cells group contains more than one values, breaks them down recursively
        else:
            # Creates a demultiplexer to select one group or the other according to the address
            (a, b) = generate_demux(input, addressBit)
            # Creates the 2 cells groups and gets their outputs
            cg1 = generate_cells_group(a, addressBit-1, values[nbVal//2:])
            cg2 = generate_cells_group(b, addressBit-1, values[:nbVal//2])
            # Creates an OR gate to combine the outputs
            nonlocal circuit
            nonlocal next_id
            circuit += "OR" + __inputSeparator + str(cg1) + __inputSeparator + str(cg2) + __gateSeparator
            next_id += 1
            # Returns the id of the OR gate (which is the output of the whole group)
            return next_id-1
        

    # Adds the name of the gate
    res = name + __paramSeparator

    # Generates the input gates
    nbAddr = round(math.log(len(values), 2))
    for i in range(nbAddr):
        res += "A" + str(i) + __gateSeparator
    res = res[:-1] + __paramSeparator
    next_id += nbAddr

    # Creates an UP and a DOWN gate to use when needed
    circuit += "UP" + __gateSeparator + "DOWN" + __gateSeparator
    upGate = next_id
    downGate = next_id+1
    next_id += 2

    # Generates the circuit (writes in the circuit variable)
    output = generate_cells_group(
        upGate, # The first demux has no controller demux so we just tie it high
        nbAddr-1, # The MSB of the address is the number of address bits -1
        values)

    # Adds the output parameter
    res += "O" + __inputSeparator + str(output) + __paramSeparator

    # Adds the circuit without the last gate separator
    return res + circuit[:-1]

