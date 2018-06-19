// Dependencies 
const path = require('path');

module.exports = function (app) {

    // public access files
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });


    // auxiliary files access routes
    app.get('/style.css', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/assets/style.css'));
    });
    app.get('/index.js', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/assets/index.js'));
    });
    app.get('/allergens.js', function (req, res) {
        res.sendFile(path.join(__dirname, '../data/allergens.js'));
    });


    // default route
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};