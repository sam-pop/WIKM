# Will It Kill Me?

## Table of Contents

* [Project description](#desc)
* [How to use](#how)
* [What we used](#tech)
* [Team members](#team-members)
* [Demo](#demo)
* [Disclaimer](#dis)

## <a name="dec"></a> Project description

Will It Kill Me (WIKM) is a fully responsive (mobile first) web app that was built in a few days as a full-stack coding project.

The goal of this project is to help people with food allergies identify potentially life threatening allergens on the go.

We decided to use AI and ML to analyze and classify images of food so we can identify common food allergens in them (with limited accuracy currently, based on the ML model we are using).

You can use this web app to snap a picture with your phone (or upload a picture from your computer) of a dish that's in-front of you, the machine learning API will then analyze the image and return a dynamic graph of the possible ingredients. We then list the possible allergic reaction causing ingredients based on the user food allergies input.

## <a name="how"></a>How to use

You can use this web app AS-IS by running it from the following link:
https://pacific-savannah-73860.herokuapp.com/

You can also run it locally by using the command `node server.js` from the command line (the web app will run on `http://localhost:3000`).

Please note that in order for the app to run locally you will need to register for an API KEY from the [Clarifai](https://www.clarifai.com/developer/account/keys) & [Cloudinary](https://cloudinary.com/users/register/free) APIs and to create a file named `.env` (in the root directory) and add the following to it, replacing the values with your own API keys:
```
# Clarifai API
key=your-api-key

# Cloudinary API
publicKey=your-public-api-key
secretKey=your-secret-api-key
cloud_name=your-cloud-name
upload_preset=your-upload-preset-for-unsigned-uploads
```

## <a name="tech"></a>What we used

This full-stack web application web built using HTML5, CSS3, JavaScript, jQuery, [Node.JS](https://nodejs.org/en/), [Express](https://expressjs.com/) (using the [body-parser](https://github.com/expressjs/body-parser) middleware), [dotenv](https://github.com/motdotla/dotenv) module, [Clarifai AI API](https://www.clarifai.com/) (image and video recognition as a service) & [Cloudinary API](https://cloudinary.com/) (cloud media storage).

## <a name="team-members"></a>Team members

* [Martina Caputy](https://github.com/mecaputy/)
* [Samuel Poplovitch](https://github.com/sam-pop/)
* [Cintia Santos](https://github.com/CintiaSantos/)

## <a name="demo"></a>Demo
https://pacific-savannah-73860.herokuapp.com/

[![Screenshot](https://s8.postimg.cc/ud4ca3xmd/ezgif.com-optimize.gif)](https://pacific-savannah-73860.herokuapp.com/)

Mobile Version:

[![Screenshot mobile](https://s8.postimg.cc/fno3jnpyt/image.jpg)](https://pacific-savannah-73860.herokuapp.com/)

## <a name="dis"></a>Disclaimer

Please DO NOT consume any food or make any decisions about foods containing allergens based solely on this app recommendations. Doing so WILL kill you! 😅