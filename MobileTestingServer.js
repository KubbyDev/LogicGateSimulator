const PORT = 33000;

const express = require('express');
const app = express();
app.listen(PORT, () => console.log("listening"));
app.use(express.static('.'));  // Sends index.html to whoever connects