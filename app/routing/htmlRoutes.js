// Dependencies 
const path = require('path');

module.exports = function (app) {

    // public access files
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.get('/style.css', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/assets/style.css'));
    });
    app.get('/index.js', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/assets/index.js'));
    });
    app.get('/about', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/about.html'));
    });


    // default route
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};