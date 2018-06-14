// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


// Express app
const app = express();
const PORT = process.env.PORT || 3000;

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Router
// app.use('/scripts', express.static(path.join(__dirname, 'node_modules/')));
// app.use('/p', express.static(path.join(__dirname, '/')));
// require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);


// Listener
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});