require("dotenv").config();
const Clarifai = require('clarifai');

const CLARIFAI_FOOD_MODEL = "bd367be194cf45149e75f01d59f77ba7";
const CLARIFAI_API_KEY = process.env.key;


// init Clarifai API
const cApp = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY
});


module.exports = function (app) {
    // POST to the api
    app.post('/api', function (req, res) {
        if (req.body) {
            img = req.body.url;
            // passes the Cloudinary stored image URL to the Clarifai API and returns the components array (object)
            cApp.models.predict(CLARIFAI_FOOD_MODEL, img).then(
                function (response) {
                    let result = response.outputs[0].data;
                    res.json(result);
                },
                function (err) {
                    console.error(err);
                }
            );
        }
    });
};