# Generates the file that contains the information necessary to display the list of gates in the Build > Custom menu

import os

__GatesLibraryLocation = "Resources"+ os.path.sep +"GatesLibrary"
__GeneratedFile = "Simulator"+ os.path.sep +"Gate"+ os.path.sep +"GatesLibrary.js"

# Finds all the markdown files in the GatesLibrary
print("Looking for GatesLibrary files...")
gateFiles = []
for dirpath, dirnames, filenames in os.walk(__GatesLibraryLocation):
    for f in filenames:
        if f.endswith(".md"):
            gateFiles.append(os.path.join(dirpath, f))
print("Found:")
for file in gateFiles:
    print("- "+ file)

gates = "// This file was generated by GenerateGatesLibraryFile.py\n// It contains all the gates of the gates library (for the custom gate popup)\n"
gates += "const gatesLibrary = [\n"

# For each library file
print("Generating data...")
for path in gateFiles:
    print("Reading file "+ path + "...")
    file = open(path, "r")
    # For each gate in the file
    fileGates = file.read().split("## ")
    file.close()
    for gateInfo in fileGates[1:]:
        lines = gateInfo.split("\n")
        # Finds the name of the gate
        name = lines[0]
        # Searches for the line containing the code
        codeLine = len(lines)-2
        while(not lines[codeLine+1].startswith("```")):
            codeLine -= 1
        code = lines[codeLine]
        # Generates the json
        print("Generating data for gate "+ name + "...")
        gates += "    {name: \""+ name +"\", code: \""+ code +"\"},\n"

gates += "];"

# Writes the results in the generated file
print("Writing data...")
file = open(__GeneratedFile, "w+")
file.write(gates)
file.close()