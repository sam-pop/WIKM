const Clarifai = require('clarifai');
require("dotenv").config();

const CLARIFAI_FOOD_MODEL = "bd367be194cf45149e75f01d59f77ba7";
const SECRET_API_KEY = process.env.key;



// instantiate a new Clarifai app passing in your api key.
const cApp = new Clarifai.App({
    apiKey: SECRET_API_KEY
});



// predict the contents of an image by passing in a url
cApp.models.predict(CLARIFAI_FOOD_MODEL, 'https://reciperhapsody.files.wordpress.com/2010/02/chicken-ranch-tacos-1-23-10_edited-1.jpg').then(
    function (response) {
        console.log(response); //response.outputs[0].data
    },
    function (err) {
        console.error(err);
    }
);