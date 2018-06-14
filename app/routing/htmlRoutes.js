// Dependencies 
const path = require('path');

module.exports = function (app) {

    // default route
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

};