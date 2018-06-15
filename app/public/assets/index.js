// variables
const screenSize = $(window).width();
let picURL; // holds the user uploaded picture URL
let reqData = {};
let ingArray = []; // holds an array of the concepts objects
let allConcepts = []; // holds an array of all the concepts labels

$(function () {
    // changes the logo text size based on the screen size
    if (screenSize < 667) {
        $('.brand-logo').html("<i class='material-icons'>thumbs_up_down</i>WIKM?");
    } else {
        $('.brand-logo').html("<i class='material-icons'>thumbs_up_down</i>Will It Kill Me?");
    }
    // init materialize components
    $('.sidenav').sidenav();
    $('select').formSelect();

    // create and init the cloudinary upload widget
    $('#upload_widget_opener').cloudinary_upload_widget({
            cloud_name: 'samp',
            upload_preset: 'kd18s7co',
            cropping: 'server',
            folder: 'user_photos',
            multiple: false,
            theme: "white",
            button_caption: "Get Started",
            show_powered_by: false,
            stylesheet: "#cloudinary-navbar .source.active {border-bottom: 6px solid #32373A;} #cloudinary-widget .button, #cloudinary-widget .button.small_button {background:linear-gradient(to bottom, darkgrey 0%, #32373A 100%)} #cloudinary-widget .button:hover, #cloudinary-widget .button.small_button:hover, #cloudinary-widget .upload_button_holder:hover .button {background: #32373A;} #cloudinary-widget .button, #cloudinary-widget .button.small_button {background:linear-gradient(to bottom, darkgrey 0%, #32373A 100%)} #cloudinary-overlay.modal {background-color: rgba(0, 0, 0, 0.7);}"
        },
        function (error, result) {
            // error function
            if (error) {
                console.log(error);
                return;
            }
            picURL = result[0].url;
            reqData.url = picURL;
            // POST to api
            $.post('/api', reqData, function (resData) {
                if (resData) {
                    conceptLabels(resData.concepts, allConcepts);
                    if (screenSize < 667) {
                        conceptsToArrayCustomSize(resData.concepts, ingArray, resData.concepts.length, 2);
                    } else {
                        conceptsToArray(resData.concepts, ingArray);
                    }

                    // create a new Image obj with dimentions that depend on the img orientation and the displayed screen size
                    let pic = new Image();
                    if (screenSize < 667) {
                        picClasses(pic, "hPic z-depth-2", "vPic z-depth-2");
                    } else {
                        picClasses(pic, 500, 300);
                    }
                    pic.src = reqData.url;
                    $('.userPic').append(pic);

                    // appends the identified ingredients on screen
                    $('.secondScreen').append(resData.concepts[0].name); //TODO: this is just the first one, need to be changed to include all

                }
            });
            $('.firstScreen').hide(); // hides the capture/upload image button

            setTimeout(function () {
                // CanvasJS
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    theme: "dark2", // "light1", "light2", "dark1", "dark2"
                    title: {
                        text: "This is what we've found:",
                        fontFamily: "Cabin Sketch"
                    },
                    axisY: {
                        title: "How sure we are %"
                    },
                    data: [{
                        type: "column",
                        showInLegend: true,
                        legendMarkerColor: "grey",
                        legendText: "Ingredients",
                        dataPoints: ingArray
                    }]
                });
                chart.render();
            }, 1000);

        });
}); //END OF $


// copies all the concepts labels from one array to another
function conceptLabels(fromArray, toArray) {
    for (let i of fromArray) {
        toArray.push(i.name);
    }
}

// copies and transforms all the concepts from one array to another (used as data for CanvasJS) 
function conceptsToArray(fromArray, toArray) {
    for (let i of fromArray) {
        let temp = {};
        temp.y = parseFloat(i.value * 100);
        temp.label = i.name;
        toArray.push(temp);
    }
}

// copies and transforms a custom number of concepts from one array to another (used as data for CanvasJS) 
function conceptsToArrayCustomSize(fromArray, toArray, size, divider) {
    for (let i = 0; i < Math.floor(size / divider); i++) {
        let temp = {};
        temp.y = parseFloat(fromArray[i].value * 100);
        temp.label = fromArray[i].name;
        toArray.push(temp);
    }
}

// addes classes to a pic object onload (if width > height)
function picClasses(pic, option1, option2) {
    pic.onload = function () {
        if (this.width > this.height) {
            pic.className = option1;
        } else pic.className = option2;
    };
}