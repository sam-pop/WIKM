require("dotenv").config();
const Clarifai = require('clarifai');
const CLARIFAI_FOOD_MODEL = "bd367be194cf45149e75f01d59f77ba7";
const SECRET_API_KEY = process.env.key;

// instantiate a new Clarifai app passing in your api key.
const cApp = new Clarifai.App({
    apiKey: SECRET_API_KEY
});


let analyzeImage = ""; //TODO: pass image url / location


/*
TODO:
1) pass the api the image url / location
2) map out the response object into small chuncks of information
3) filter and manipulate the information for our needs
*/

// predict the contents of an image by passing in a url
cApp.models.predict(CLARIFAI_FOOD_MODEL, analyzeImage).then(
    function (response) {
        console.log(response); //response.outputs[0].data
    },
    function (err) {
        console.error(err);
    }
);