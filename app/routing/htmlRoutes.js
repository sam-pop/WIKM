// Dependencies 
const path = require('path');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/about', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/about.html'));
    });

    // default route
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};