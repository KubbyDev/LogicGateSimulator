# This script takes the output of Babel and puts it in a single HTML file

# Babel installation:
# npm init
# npm install babel-cli babel-core --save-dev
# npx babel-upgrade --write
# npm install @babel/preset-env --save-dev
# npm install --save-dev @babel/plugin-proposal-class-properties
# Setup file watcher on webstorm to make it automatic:
# Program: $ProjectFileDir$\node_modules\.bin\babel
# Arguments: Simulator\**\*.js Simulator\*.js --out-file babelOutput.js --minified --presets @babel/env
# Output paths to refresh: babelOutput.js
# Working directory: $ContentRoot$

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
__commentDetectionRegex = r'(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)'
# Thanks to this site: https://blog.ostermiller.org/finding-comments-in-source-code-using-regular-expressions/


def simpleMinifiy(string):
    withoutComment = re.sub(__commentDetectionRegex, '', string)
    return re.sub(r'[\n\r]*', '', withoutComment)

# Reads the babel output
f = open(__babelOutputPath, "r")
content = f.read()
f.close()
# Uses javascript-minifier.com to minify the babel output
data = dict(input=content)
minifiedContent = simpleMinifiy(content)
# Creates and opens the HTML file and writes the first part (which doesn't change)
file = open("index.html", "w+")
file.write(__htmlBegin)
# Write the javascript in the generated HTML
file.write(minifiedContent + "\n")
# Writes the first part (which doesn't change) and closes the file
file.write(__htmlEnd)
file.close()