// variables
const screenSize = $(window).width();
let reqData = {};
let ingArray = []; // holds an array of the concepts objects
let allConcepts = []; // holds an array of all the concepts labels
let allergensFound = [];
let userAllergies = [];


$(function () {
    $('.smallScreenAllergies').hide();
    $('.largeScreenAllergies').hide();
    $('.secondScreen').hide();

    // changes the page appearance based on the screen size 
    if (screenSize < 667) {
        $('.brand-logo').html("<i class='material-icons'>thumbs_up_down</i>WIKM?");
        $('.smallScreenAllergies').show();
    } else {
        $('.description').addClass('container');
        $('.card').css('padding', '3%');
        $('.brand-logo').html("<i class='material-icons'>thumbs_up_down</i>Will It Kill Me?");
        $('.largeScreenAllergies').show();
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
            stylesheet: "#cloudinary-navbar .source.active {border-bottom: 6px solid #32373A;} #cloudinary-widget .button, #cloudinary-widget .button.small_button {background:linear-gradient(to bottom, #32373A 0%, rgb(93, 102, 107) 100%)} #cloudinary-widget .button:hover, #cloudinary-widget .button.small_button:hover, #cloudinary-widget .upload_button_holder:hover .button {background:linear-gradient(to bottom, rgb(93, 102, 107) 0%, #32373A 100%)} #cloudinary-widget .button, #cloudinary-widget .button.small_button {background:linear-gradient(to bottom, darkgrey 0%, #32373A 100%)} #cloudinary-overlay.modal {background-color: rgba(0, 0, 0, 0.7);}"
        },
        function (error, result) {
            // error function
            if (error) {
                console.log(error);
                return;
            }
            // on success
            reqData.url = result[0].url;
            if (screenSize < 667) {
                // get the user allergies (from the multiple select dropbox)
                let instance = M.FormSelect.getInstance($('select'));
                userAllergies = instance.getSelectedValues();
            } else {
                // get the user allergies (from the checkboxes)
                for (let i of $("input:checked")) {
                    userAllergies.push(i.value);
                }
            }
            // POST to api
            $.post('/api', reqData, function (resData) {
                if (resData) {
                    conceptLabels(resData.concepts, allConcepts);
                    // optimize for screen size
                    if (screenSize < 667) {
                        conceptsToArrayCustomSize(resData.concepts, ingArray, resData.concepts.length, 2);
                    } else {
                        conceptsToArray(resData.concepts, ingArray);
                    }
                    console.log(userAllergies);
                    // compares the found concepts to the user allergies and the allergies data, if a match is founds its pushed into an array
                    for (let allergy of userAllergies) { // iterates over the user allergies
                        for (let allergen of allergens) { // iterates over the allergens data
                            if (allergen.name == allergy) {
                                for (let concept of allConcepts) { // iterate over the returned concepts (Clarafai API)
                                    for (let i of allergen.data) {
                                        if (i == concept) {
                                            allergensFound.push(i);
                                            console.log("allergen found: " + i);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // shows an alert and on screen message if no known allergens were found
                    if (allergensFound.length === 0) {
                        swal({
                            title: "Great news!",
                            text: "It will PROBABLY NOT kill you.",
                            icon: "success",
                            button: "Let's eat :)",
                        });
                        $('.userMsg').append($('<h2>').css('color', 'green').addClass('center').html("<i class='material-icons' style='font-size: 0.8em;'>thumb_up</i>&nbsp;YOU\'RE SAFE!"));
                    } else { // shows an alert and on screen message if known allergens were found
                        swal({
                            title: "Bad news...",
                            text: "It will PROBABLY kill you.",
                            icon: "error",
                            dangerMode: true,
                            button: "I'll eat something else",
                        });
                        $('.userMsg').append($('<h2>').css({
                            'color': 'red',
                            'font-weight': 'bold'
                        }).addClass('center').html("<i class='material-icons' style='font-size: 0.8em;'>thumb_down</i>&nbsp;SPIT IT OUT!"));
                        let allergensToDisplay = "";
                        // optimize the allergens found list (displayed in lines of 5 items) 
                        for (let i = 0; i < allergensFound.length; i++) {
                            if ((i !== 0) && (i % 5 === 0)) {
                                allergensToDisplay += allergensFound[i] + ",<br>";
                            } else {
                                if (i === allergensFound.length - 1)
                                    allergensToDisplay += allergensFound[i] + ".";
                                else allergensToDisplay += allergensFound[i] + ", ";
                            }
                        }
                        $('.userMsgIng').append($('<p>').addClass('center').html("The following ingredients <b>may be harmful</b> to you:<br>" + allergensToDisplay));
                    }
                    // page display animation
                    $('.secondScreen').addClass('animated zoomIn').show();

                    // create a new Image obj with dimentions that depend on the uploaded image orientation and the user screen size
                    let pic = new Image();
                    pic.onload = function () {
                        (this.width > this.height) ? pic.className = 'hPic z-depth-2': pic.className = 'vPic z-depth-2';
                    };
                    pic.src = reqData.url;
                    $('.userPic').append(pic);
                }
            }).then(function () {
                // CanvasJS
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    title: {
                        text: "This is what we've found:",
                        fontFamily: "Cabin Sketch"
                    },
                    axisY: {
                        title: "How sure we are %",
                        maximum: 100
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
            });
            // hides unnecessary page elements
            $('.firstScreen').hide(); // hides the capture/upload image button
            $('.description').hide();
            $('.smallScreenAllergies').hide();
            $('.largeScreenAllergies').hide();
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
