// Dependencies 
const path = require('path');

module.exports = function (app) {

    // survey page route
    app.get('/test', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/test.html'));
    });

    // default route
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};