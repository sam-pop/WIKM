// Dependencies 
const path = require('path');

module.exports = function (app) {

    app.get('/test', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/test.html'));
    });

    app.get('/test2', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/test2.html'));
    });

    // default route
    // app.get('*', function (req, res) {
    //     res.sendFile(path.join(__dirname, '../public/index.html'));
    // });

};