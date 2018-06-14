// Dependencies 
const path = require('path');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.get('/WIKM', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/result.html'));
    });

    //TODO: DELETE (testing) 
    app.get('/test2', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/test-sam.html'));
    });

    // default route
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};