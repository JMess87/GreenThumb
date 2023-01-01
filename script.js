var plantName = $('#search-input');
var filter = $('#filter-btn');
var search = $('#search-btn');
var categoryFilter = $('#filter-box');
var commonNamesList = $('#commonnameslist');
var searchButton = $('#search');
var findBtn = $('#find-btn');
var plantDetails = $('#plantdetails');
var family = $('#family');
var common = $('#commonname');
var category = $('#category');
var origin = $('#origin')
var latin = $('#latinname');
var climate = $('#climate');
var tempMax = $('#tempmax');
var tempMin = $('#tempmin');
var idealLight = $('#ideallight');
var toleratedLight = $('#toleratedlight');
var watering = $('#watering');
var hangingButton = $('#hanging')
var fernButton = $('#fern');
var succulentButton = $('#succulent');
var flowerButton = $('#flower');
var foliagePlantButton = $('#foliagePlant');
var palmButton = $('#palm');
var plantImage = $('#plantimage');
var allPlantsCommonLatinNames = [];
var hangingPlants = [];
var fernPlants = [];
var cactussucculentPlants = [];
var flowerPlants = [];
var foliagePlants = [];
var palmPlants = [];
var listItem = $('<li>');
var getAllImages = [];
var imglatin = new Object();

var imgSourceArray = [];
var useEl = $('#use');
var singleCategoryArr = [];
var hangingPlantsArr = [];
var fernPlantsArr = [];
var cactusPlantsArr = [];
var flowerPlantsArr = [];
var foliagePlantsArr = [];
var palmPlantsArr = [];
const marquee1 = document.getElementById('marquee1');


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a9893fa65emsh05499dc68ccba82p199e67jsnbfdbb0594c96',
        'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
    }
};

const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a9893fa65emsh05499dc68ccba82p199e67jsnbfdbb0594c96',
        'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
    }
};

// fetch all plants data from API-2
fetch(`https://house-plants2.p.rapidapi.com/`, options2)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            var secondLatin = data[i]['Latin name'];
            secondLatin = secondLatin.split('\'')[0];
            secondLatin = secondLatin.toLowerCase().trim();
            secondLatin = secondLatin.split(' ').join('');
            imglink = data[i].img;
            imglatin = {
                latinname: secondLatin,
                imgsource: imglink
            }
            // push each object comtaining latin name and image link to an array
            getAllImages.push(imglatin);

            // push hanging category in hangingPlants Array (ZL)
            if (data[i]['Categories'] === 'Hanging') {
                hangingPlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Fern') {
                fernPlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Cactus & Succulent') {
                cactusPlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Flower') {
                flowerPlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Foliage plant') {
                foliagePlantsArr.push(data[i]);
            }
            else if (data[i]['Categories'] === 'Palm') {
                palmPlantsArr.push(data[i]);
            };

        }
    })
    .catch(function (err) {
        console.error(err);
    });

// modified filter button code to hide and show by clicking the same button (ZL)
filter.click(function (e) {
    e.preventDefault();
    var filterDisplay = document.getElementById('filter-box').style.display;
    if (filterDisplay === 'none') {
        $('#filter-box').attr('style', 'display:show');
        $('#homepage-spacer-btm').attr('style', 'display:none');
    } else {
        $('#filter-box').attr('style', 'display:none');
        $('#plant-card-container').empty();
        $('#result-number-text').text('');
        $('#homepage-spacer-btm').attr('style', 'display:show');
        $('#img-plant-row').attr('style', 'display:show');
        $('#search-input').val('');
        // reset the plants name array to include all plants for search input
        allPlantsInThisCategory(allPlantsCommonLatinNames);
    };
})
function getAllCommonNames() {
    fetch('https://house-plants.p.rapidapi.com/all', options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var category = data[i].category;
                var latinName = data[i].latin;
                allPlantsCommonLatinNames.push(data[i].common + "(" + latinName + ")");
                switch (category) {
                    case 'Hanging':
                        hangingArray(data[i].common, latinName);
                        break;
                    case 'Fern':
                        fernArray(data[i].common, latinName);
                        break;
                    case 'Cactus & Succulent':
                        cactussucculentArray(data[i].common, latinName);
                        break;
                    case 'Flower':
                        flowerArray(data[i].common, latinName);
                        break;
                    case 'Foliage plant':
                        foliageArray(data[i].common, latinName);
                        break;
                    case 'Palm':
                        palmArray(data[i].common, latinName);
                        break;
                }
            }
        })
        .catch(function (err) {
            console.error(err);
        });
};

getAllCommonNames();

plantName.keyup(allPlantsInThisCategory(allPlantsCommonLatinNames));

function hangingArray(hanging, latin) {
    for (var j = 0; j < hanging.length; j++) {
        hangingPlants.push(hanging[j] + "(" + latin + ")");
    }
}
function fernArray(fern, latin) {
    for (var j = 0; j < fern.length; j++) {
        fernPlants.push(fern[j] + "(" + latin + ")");
    }
}
function cactussucculentArray(cactussucculent, latin) {
    for (var j = 0; j < cactussucculent.length; j++) {
        cactussucculentPlants.push(cactussucculent[j] + "(" + latin + ")");
    }
}
function flowerArray(flower, latin) {
    for (var j = 0; j < flower.length; j++) {
        flowerPlants.push(flower[j] + "(" + latin + ")");
    }
}
function foliageArray(foliage, latin) {
    for (var j = 0; j < foliage.length; j++) {
        foliagePlants.push(foliage[j] + "(" + latin + ")");
    }
}
function palmArray(palm, latin) {
    for (var j = 0; j < palm.length; j++) {
        palmPlants.push(palm[j] + "(" + latin + ")");
    }
}

// modified click event for hanging button(ZL)
hangingButton.click(function (e) {
    e.preventDefault();
    // remove all child nodes under section #plant-card-container
    $('#plant-card-container').empty();
    // hide decoration image below
    $('#img-plant-row').attr('style', 'display:none');
    // assign category array to a new array for running shared functions under each category 
    singleCategoryArr = hangingPlantsArr;
    // display the number of plants under selected category
    showResultText();
    // show all cards under selected category
    showSingleCategoryCard();
    allPlantsInThisCategory(hangingPlants);
});

fernButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = fernPlantsArr;
    showResultText();
    showSingleCategoryCard();
    allPlantsInThisCategory(fernPlants);
});

succulentButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = cactusPlantsArr;
    showResultText();
    showSingleCategoryCard();
    allPlantsInThisCategory(cactussucculentPlants);
});

flowerButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = flowerPlantsArr;
    showResultText();
    showSingleCategoryCard();
    allPlantsInThisCategory(flowerPlants);
});

foliagePlantButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = foliagePlantsArr;
    showResultText();
    showSingleCategoryCard();
    allPlantsInThisCategory(foliagePlants);
});

palmButton.click(function (e) {
    e.preventDefault();
    // added code (ZL)
    $('#plant-card-container').empty();
    $('#img-plant-row').attr('style', 'display:none');
    singleCategoryArr = palmPlantsArr;
    showResultText();
    showSingleCategoryCard();
    allPlantsInThisCategory(palmPlants);
});

function allPlantsInThisCategory(currentCategoryArray) {
    plantName.keyup(function (e) {
        plantImage.attr('src', '');
        family.text('');
        common.text('');
        category.text('');
        origin.text('');
        latin.text('');
        climate.text('');
        tempMax.text('');
        tempMin.text('');
        idealLight.text('');
        toleratedLight.text('');
        watering.text('');

        $('li').each(function () {
            $(this).remove();
        });

        var name = $(this).val().toLowerCase();
        for (i = 0; i < currentCategoryArray.length; i++) {
            var commonName = currentCategoryArray[i].toLowerCase();
            if (commonName.startsWith(name) && name != '') {
                var listItem = $('<li>');
                listItem.text(currentCategoryArray[i]);
                commonNamesList.append(listItem);
                // when click outside of the search list, the search list will be closed
                $(document).click(function (e) {
                    e.preventDefault();
                    if (e.target !== 'li') {
                        $('li').remove();
                    };
                });
                // when select one plant in the list, the plant name will be displayed on the search box
                $('li').click(function () {
                    plantName.val($(this).text());
                    $('li').remove();
                });
            }
        }
    });
}

search.click(function (e) {
    e.preventDefault();
    var name = plantName.val();
    retrievePlantInfo(name);
    plantDetails.addClass('is-active');
});

function retrievePlantInfo(name) {
    var commonName = name.split('(')[0];
    var latinName = name.split('(')[1];
    latinName = latinName.slice(0, -1);
    latinName = latinName.toLowerCase().trim();
    latinName = latinName.split(' ').join('');

    fetch(`https://house-plants.p.rapidapi.com/latin/${latinName}`, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var imagesourcelink;
            for (var i = 0; i < getAllImages.length; i++) {
                if(latinName === getAllImages[i].latinname){
                    imagesourcelink = getAllImages[i].imgsource;
                    plantImage.attr('src', imagesourcelink);
                    break;
                } 
                if(latinName !== getAllImages[i].latinname){
                    imagesourcelink = findImage(latinName);
                    if(typeof imagesourcelink !== "undefined"){
                        plantImage.attr('src', imagesourcelink);
                        break;
                    }
                }
            }
        
            common.text(commonName);
            family.text(data[0].family);
            category.text(data[0].category);
            origin.text(data[0].origin);
            latin.text(data[0].latin);
            climate.text(data[0].climate);
            tempMax.text('Max ' + data[0].tempmax.celsius + '\xB0' + 'C');
            tempMin.text('Min ' + data[0].tempmin.celsius + '\xB0' + 'C');
            idealLight.text(data[0].ideallight);
            toleratedLight.text(data[0].toleratedlight);
            watering.text(data[0].watering);
            useEl.text(data[0].use[0]);
        })
        .catch(function (err) {
            console.error(err);
        });
};

function findImage(findImageByLatinName){
    var imageSourceLink; 
    switch(findImageByLatinName){
        case 'aechmeafasciata':
            imageSourceLink = "./images/ResultsImages/Aechmeafasciata.jpeg";
            return imageSourceLink;
        case 'agaveangustiloliamarginata':
            imageSourceLink = "./images/ResultsImages/Agaveangustiloliamarginata.jpeg";
            return imageSourceLink;
        case 'calatheapicturaargentea':
            imageSourceLink = "./images/ResultsImages/Calatheapicturaargentea.jpeg";
            return imageSourceLink;
        case 'chamaedoreaseifrizii': 
            imageSourceLink = "./images/ResultsImages/Chamaedoreaseifrizii.jpeg";
            return imageSourceLink; 
        case 'codiaeum':
            imageSourceLink = "./images/ResultsImages/Codiaeum.jpeg";
            return imageSourceLink;    
        case 'dracaenafragransmassangeana':
            imageSourceLink = "./images/ResultsImages/Dracaenafragransmassangeana.jpg";
            return imageSourceLink; 
        case 'dieffenbachiaamoena':
            imageSourceLink = "./images/ResultsImages/Dieffenbachiaamoena.jpeg";
            return imageSourceLink; 
        case 'hoyacarnosaexotica':
            imageSourceLink = "./images/ResultsImages/Hoyacarnosaexotica.jpeg";
            return imageSourceLink; 
        case 'liriopemuscarivariegata':
            imageSourceLink = "./images/ResultsImages/Liriopemuscarivariegata.jpeg";
            return imageSourceLink; 
        case 'hibiscusrosasinensis':
            imageSourceLink = "./images/ResultsImages/Hibiscusrosasinensis.jpeg";
            return imageSourceLink; 
        case 'nephrolepisexaltatavar':
            imageSourceLink = "./images/ResultsImages/Nephrolepisexaltata.jpeg";
            return imageSourceLink; 
        case 'pteriscreticaparkeri':
            imageSourceLink = "./images/ResultsImages/Pteriscreticaparkeri.jpeg";
            return imageSourceLink; 
        case 'polystichumtsussimense':
            imageSourceLink = "./images/ResultsImages/Polystichumtsussimense.jpeg";
            return imageSourceLink;
        case 'pteriscreticaalbolineata':
            imageSourceLink = "./images/ResultsImages/Pteriscreticaalbolineata.jpeg";
            return imageSourceLink;   
        case 'sansevieriatrifasciatahahnii':
            imageSourceLink = "./images/ResultsImages/Sansevieriatrifasciatahahnii.jpeg";
            return imageSourceLink;    
        case 'polysciaspinnatamarginata':
            imageSourceLink = "./images/ResultsImages/Polysciaspinnatamarginata.jpeg";
            return imageSourceLink; 
        case 'polysciasfruticosaelegans':
            imageSourceLink = "./images/ResultsImages/Polysciasfruticosaelegans.jpeg";
            return imageSourceLink; 
        case 'pterisensiformisevergemiensis':
            imageSourceLink = "./images/ResultsImages/Pterisensiformisevergemiensis.jpeg";
            return imageSourceLink; 
        case 'spathiphyllumlynise':
            imageSourceLink = "./images/ResultsImages/Spathiphyllumlynise.jpeg";
            return imageSourceLink; 
        case 'spathiphyllumceres':
            imageSourceLink = "./images/ResultsImages/Spathiphyllumceres.jpeg";
            return imageSourceLink; 
        case 'spathiphyllumsensation':
            imageSourceLink = "./images/ResultsImages/Spathiphyllumsensation.jpeg";
            return imageSourceLink; 
        case 'spathiphyllumstarlight':
            imageSourceLink = "./images/ResultsImages/Spathiphyllumstarlight.jpeg";
            return imageSourceLink; 
        case 'spathiphyllumdomino':
            imageSourceLink = "./images/ResultsImages/Spathiphyllumdomino.jpeg";
            return imageSourceLink; 
        case 'scheffleraarboricolatrinette':
            imageSourceLink = "./images/ResultsImages/Scheffleraarboricolatrinette.jpeg";
            return imageSourceLink;  
        case 'scheffleraactinophyllaamate':
            imageSourceLink = "./images/ResultsImages/Scheffleraactinophyllaamate.jpeg";
            return imageSourceLink; 
        case 'scheffleraactinophyllarenegade':
            imageSourceLink = "./images/ResultsImages/Scheffleraactinophyllarenegade.jpeg";
            return imageSourceLink; 
        case 'spathiphyllumsupreme':
            imageSourceLink = "./images/ResultsImages/Spathiphyllumsupreme.jpeg";
            return imageSourceLink;                                 
    } 
}

$('#delete-btn').click(function (e) {
    e.preventDefault();
    plantDetails.removeClass('is-active');
});

$('#plant-cancel-btn').click(function (e) {
    // e.preventDefault();
    plantDetails.removeClass('is-active');
});

$('#plant-card-container').click(function (e) {
    e.preventDefault();
    var cardPlantID;
    if (e.target.tagName === 'IMG') {
        cardPlantID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        showInfoByID(cardPlantID);
        plantDetails.addClass('is-active');
    };
});

// function to show plant cards by appending sections to the container section (ZL)
function showSingleCategoryCard() {
    for (var i = 0; i < singleCategoryArr.length; i++) {
        // including bulma style classes in the appended elements
        $('<section class="column is-4"><section class="card"></section></section>').appendTo('#plant-card-container');
        var imageCard = document.getElementById('plant-card-container');
        $(imageCard.children[i]).attr('id', singleCategoryArr[i].id);
        $('<div class="card-image"><figure class="result-image image is-4by3"><img></figure></div>').appendTo(imageCard.children[i].children[0]);
        var imgCardEl = $('#plant-card-container img');
        $(imgCardEl[i]).attr('src', singleCategoryArr[i].img);
        $('<div class="card-content"><div class="media"><div class="media-content"><p class="title is-4"></p></div></div></div>').appendTo(imageCard.children[i].children[0]);
        var imgCardTitle1 = $('#plant-card-container p');
        if (singleCategoryArr[i]['Common name'] !== null) {
            $(imgCardTitle1[i]).text(singleCategoryArr[i]['Common name'][0]);
        } else {
            $(imgCardTitle1[i]).text(singleCategoryArr[i]['Latin name']);
        };
    };
    for (var i = 0; i < singleCategoryArr.length; i++) {
        $('<p class="subtitle is-6"></p>').insertAfter(imgCardTitle1[i]);
        $(imgCardTitle1[i].parentNode.children[1]).text(singleCategoryArr[i]['Latin name']);
    };
}

function showInfoByID(cardPlantID) {
    for (var i = 0; i < singleCategoryArr.length; i++) {
        if (cardPlantID === singleCategoryArr[i].id) {
            plantImage.attr('src', singleCategoryArr[i].img);
            // if a plant doesn't have a common name in the API data, show latin name instead
            if (singleCategoryArr[i]['Common name'] !== null) {
                common.text(singleCategoryArr[i]['Common name'][0]);
            } else {
                common.text(singleCategoryArr[i]['Latin name']);
            };
            family.text(singleCategoryArr[i]['Family']);
            category.text(singleCategoryArr[i]['Categories']);
            origin.text(singleCategoryArr[i]['Origin'].join());
            latin.text(singleCategoryArr[i]['Latin name']);
            climate.text(singleCategoryArr[i]['Climat']);
            tempMax.text('Max ' + singleCategoryArr[i]['Temperature max']['C'] + '\xB0' + 'C');
            if (singleCategoryArr[i]['Temperature min'] !== null) {
                tempMin.text('Min ' + singleCategoryArr[i]['Temperature min']['C'] + '\xB0' + 'C');
            } else {
                tempMin.text('');
            };
            idealLight.text(singleCategoryArr[i]['Light ideal']);
            toleratedLight.text(singleCategoryArr[i]['Light tolered']);
            watering.text(singleCategoryArr[i]['Watering']);
            useEl.text(singleCategoryArr[i]['Use'][0]);
        };
    };
}
// function to show search research message (ZL)
function showResultText() {
    var resultNumberText = "We've found " + singleCategoryArr.length + " " + "plants under " + '"' + singleCategoryArr[0]['Categories'] + '"' + " category:";
    $('#result-number-text').text(resultNumberText);
    $('#homepage-spacer-btm').attr('style', 'display:none');
}

// Marquee Animation
animate(marquee1);


function animate(element) {
    let elementWidth = element.offsetWidth;
    let parentWidth = element.parentElement.offsetWidth;
    let flag = 0;

    setInterval(() => {
        element.style.marginLeft = --flag + "px";

        if (elementWidth == -flag) {
            flag = parentWidth;
        }
    },20);
}

// -------------------------------------------------------------------------- // 
// Brian - JS for Map and Store Locator //

window.map = undefined;
var geocoder;
var map;
var latitude = 0;
var longitude = 0;

var infowindow;
var storeArray;
let level1ResultsG = [];
let level2ResultsG = [];
let combineResultsG;
let placeID;


function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    window.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    console.log("init map");
}

function updateMap() {
    console.log("update map");
    console.log(latitude, longitude);
    var center = new google.maps.LatLng(latitude, longitude);
    window.map.panTo(center);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                updateMap();
                findPlace();
            },

            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        zipInfoWindow();
                        break;
                    case error.POSITION_UNAVAILABLE:
                        zipInfoWindow();
                        break;
                    case error.TIMEOUT:
                        zipInfoWindow();
                        break;
                    case error.UNKNOWN_ERROR:
                        zipInfoWindow();
                        break;
                }
            }
        );

    }
}

function zipInfoWindow() {
    const zipInfoWindowContentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Please Enter Your Zip Code</h1>' +
        '<div id="bodyContent">' +
        '<input type="text" id="zipField" placeholder="Zip Code">' +
        '<button id="zipButton" onclick="zipCode(), zipInfoWindow.close()"  class="button is-success">Submit</button>';

    const zipInfoWindow = new google.maps.InfoWindow({

        content: zipInfoWindowContentString,
        position: { lat: 0, lng: 0 },
        maxWidth: 200
    });
    zipInfoWindow.open(map);
    console.log("zip info window");
}


function zipCode() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("zipField").value;
    geocoder.geocode({ address: address }, function (results, status) {
        if (status == "OK") {
            console.log(results);
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            console.log("lat: " + latitude + " lng: " + longitude + "geo success");
            updateMap();
            findPlace();
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

function findPlace() {
    let level1Promise = new Promise((resolve) => {
        var request = {
            location: new google.maps.LatLng(latitude, longitude),
            radius: "5000",
            query: "plant nursery",
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, lvl1callback);

        function lvl1callback(level1Results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(level1Results);
                level1ResultsG = level1Results;
            }
            combineResultsG = level1ResultsG;           
            resolve();
        }
    });
    level1Promise.then(() => {
        let level2Promises = [];
        for (let i = 0; i < level1ResultsG.length; i++) {
            let p = new Promise((resolve) => {
                setTimeout(() => {
                    var request2 = {
                        placeId: level1ResultsG[i].place_id,
                        fields: [
                            "name",
                            "rating",
                            "formatted_phone_number",
                            "geometry",
                            "website",
                        ],
                    };
                    service1 = new google.maps.places.PlacesService(map);
                    service1.getDetails(request2, lvl2callback);
                }, i * 250); //
                function lvl2callback(level2results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        console.log(level2results);
                        level2ResultsG.push(level2results);
                    }
                    combineResultsG[i].formatted_phone_number =
                        level2ResultsG[i].formatted_phone_number;
                    combineResultsG[i].website = level2ResultsG[i].website;
                    combineResultsG[i].rating = level2ResultsG[i].rating;
                    //   createMarker(i);
                    domManipPlaces(i);
                    resolve();
                }

            });

            level2Promises.push(p);
        }

        Promise.all(level2Promises).then();
    });
}
//   function createMarker(i) {
//     var place = level1ResultsG[i];
//     var placeLoc = place.geometry.location;
//     var marker = new google.maps.Marker({
//       map: map,
//       animation: google.maps.Animation.DROP,
//       position: placeLoc,
//     });
// }

function domManipPlaces(i) {
    var place = combineResultsG[i];
    if (place.name == undefined || place.formatted_address == undefined || place.formatted_phone_number == undefined || place.website == undefined || place.rating == undefined) {
        return;
    }

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: placeLoc,
    });

    var placeDiv = $("<div>", { class: "place", id: "place" + i });
    var placeName = $("<h2>", { class: "placeName" }).html(place.name);
    var placeAddress = $("<p>", { class: "placeAddress" }).html(place.formatted_address);
    var placePhone = $("<p>", { class: "placePhone" }).html(place.formatted_phone_number);
    var placeWebsite = $("<a>", {
        class: "placeWebsite",
        href: place.website,
        title: place.website,
        target: "_blank",
    }).html("Website");
    var placeRating = $("<p>", { class: "placeRating" }).html(place.rating + "/5" + " of " + place.user_ratings_total + " ratings");

    placeDiv.append(placeName, placeAddress, placePhone, placeWebsite, placeRating);

    // Find the div with the highest rating
    var highestRatedDiv = null;
    var highestRating = -1;
    $(".place").each(function () {
        var ratingScore = place.user_ratings_total * place.rating;
        console.log(place.user_ratings_total)
        console.log(place.rating)
        console.log(ratingScore)
        if (ratingScore > highestRating) {
            highestRatedDiv = $(this);
            highestRating = ratingScore;
        }
    });

    // If the current place has a higher rating, insert it before the highest rated div
    if (highestRatedDiv == null || place.rating > highestRating) {
        $("#places").prepend(placeDiv);
    } else {
        highestRatedDiv.after(placeDiv);
    }
}


window.initMap = initMap;