require("dotenv").config();
const Clarifai = require('clarifai');
const CLARIFAI_FOOD_MODEL = "bd367be194cf45149e75f01d59f77ba7";
const CLARIFAI_API_KEY = process.env.key;


// init Clarifai API
const cApp = new Clarifai.App({
    apiKey: CLARIFAI_API_KEY
});

module.exports = function (app) {
    app.post('/WIKM', function (req, res) {
        if (req.body) {
            // console.log(req.body.url);
            res.json(runPredict(req.body.url));
        }
    });
};


function runPredict(img) {
    console.log('​runPredict -> img', img);
    // using the image link - performs a model predict query to the clarifai (machine learning) API
    cApp.models.predict(CLARIFAI_FOOD_MODEL, img).then(
        function (response) {
            console.log('​runPredict -> response.outputs[0].data', response.outputs[0].data);
            return (response.outputs[0].data);
        },
        function (err) {
            console.error(err);
        }
    );
}