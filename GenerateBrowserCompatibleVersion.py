# This script takes the output of Babel and puts it in a single HTML file
# Installation instruction at the bottom of the file

import os
import requests
import re

__babelOutputPath = "babelOutput.js"
__htmlBegin = \
"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Logic Gate Simulator</title>
    <link rel="stylesheet" type="text/css" href="Simulator/Style.css"/>
</head>
<body>

<canvas id="canvas" width="1400" height="700"></canvas>

<div id="popup_bg" onclick="Popup.closeIfClickedOnBackground()">
    <div id="popup_main_div">
        <!-- Filled by the program when needed -->
    </div>
</div>

<!-- This HTML went through Babel and javascript-minifier, so its not readable -->
<!-- for a human being. The readable version of the code can be found here: -->
<!-- https://github.com/KubbyDev/LogicGateSimulator/tree/master/Simulator -->
<script>
"""
__htmlEnd = \
"""</script>

</body>
</html>
"""
__jsMinifierURL = "https://javascript-minifier.com/raw"

def minifiy(content):
    data = dict(input=content)
    return str(requests.post(__jsMinifierURL, data=data, allow_redirects=True).content, "utf-8")

# Reads the babel output
print("Reading babel output...")
f = open(__babelOutputPath, "r")
content = f.read()
f.close()
# Uses javascript-minifier.com to minify the babel output
print("Minifying babel output...")
minifiedContent = minifiy(content)
# Creates and opens the HTML file and writes the first part (which doesn't change)
print("Generating output file...")
file = open("index.html", "w+")
file.write(__htmlBegin)
# Write the javascript in the generated HTML
file.write(minifiedContent + "\n")
# Writes the last part (which doesn't change) and closes the file
file.write(__htmlEnd)
file.close()



# Installation instructions --------------------------------------------------------------------------------------------

# Babel installation with node:
# npm init
# npm install
# npm install -g npm
# npm install webpack
# npm install babel-cli babel-core --save-dev
# npm install @babel/core
# npx babel-upgrade --write
# npm install @babel/preset-env --save-dev
# npm install --save-dev @babel/plugin-proposal-class-properties
# npm install babel-plugin-cycle-circular
# npm install --save-dev @babel/plugin-transform-classes
# npm install babel-types
# npm install circular-dependency-plugin
# npm install

# Setup a file watcher on webstorm to make it automatic:
# Program: $ProjectFileDir$\node_modules\.bin\babel
# Arguments: Simulator\*.js Simulator\**\*.js --out-file babelOutput.js --minified --presets @babel/env
# Output paths to refresh: babelOutput.js
# Working directory: $ContentRoot$

# Create a ".babelrc" file with this (location: root directory (same as .gitignore for example):
'''
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "babel-plugin-cycle-circular",
    "@babel/plugin-transform-classes"
  ]
}
'''

# Then just execute this script to generate index.html (I do it with an external tool on WebStorm)