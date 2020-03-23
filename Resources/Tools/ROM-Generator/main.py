import generator

# This program generates read only memories
# It will ask you the name and size of the memory and the bits in order
# then it will generate the ROM as a custom gate and output the generation code


# IO Functions -----------------------------------------------------------------


# Gets the name of the ROM
# Returns None if there is an error
def get_name():
    
    # TODO: Check for forbidden characters

    name = input("Name of the ROM: ")
    return name


# Asks for the size of the ROM in bits
# Must be a positive power of 2
# Returns -1 if there is an error
def get_size():
    
    sizeString = input("Size of the ROM (Positive power of 2!): ")

    size = 0
    try:
        size = int(sizeString)
    except:
        print("ERROR: The size of the ROM must be an integer!")
        return -1
    
    tmp = 1
    while(tmp < size):
        tmp *= 2
    if(tmp != size):
        print("ERROR: The size of the ROM must be a positive power of 2!")
        return -1

    return size


# Gets the values (only 0s and 1s) that the user wants to be stored in the ROM
# If the user inputs less values than asked, the remaining ones will be filled
# with 0s. If he inputs more than asked, returns None
def get_values(size):

    values = input("Values (0s and 1s): ")
    length = len(values)

    for v in values:
        if v != '0' and v != '1':
            print("ERROR: The values must be only 0s and 1s (no spaces)!")
            return None

    if length > size:
        print("ERROR: Found "+str(length)+" values while expecting "+str(size)+"!")
        return None

    if length < size:
        print("Found "+str(length)+" values while expecting "+str(size)+". Filling with 0s...")
    while length < size:
        values += '0'
        length += 1

    return values


# Main Program -----------------------------------------------------------------


name = get_name()
if(name == None):
    raise Exception()
size = get_size()
if(size == -1):
    raise Exception()
values = get_values(size)
if(values == -1):
    raise Exception()

print("Generating ROM...")
res = generator.generate_rom(name, values)
print("Done!\nCopy this code, then open the simulator, go to build mode, scroll to the bottom of the list on the right and select Custom. Then paste the code and use your ROM!\n")
print(res)
