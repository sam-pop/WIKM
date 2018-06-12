const Clarifai = require('clarifai');

const CLARIFAI_FOOD_MODEL = "bd367be194cf45149e75f01d59f77ba7";


// instantiate a new Clarifai app passing in your api key.
const capp = new Clarifai.App({
    apiKey: 'YOUR_API_KEY'
});

// predict the contents of an image by passing in a url
capp.models.predict(CLARIFAI_FOOD_MODEL, 'https://samples.clarifai.com/food.jpg').then(
    function (response) {
        console.log(response);
    },
    function (err) {
        console.error(err);
    }
);