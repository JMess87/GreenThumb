var plantName = $('#plantname');
var filter = $('#filter');
var search = $('#search');
var categoryFilter = $('#categoryfilter');
var commonNamesList = $('#commonnameslist');
var searchButton = $('#search');
var family = $('#family');
var category = $('#category');
var origin = $('#origin')
var latin = $('#latinname');
var plantName = $('#plantName');
var commonNamesList = $('#commonNamesList');
var searchButton = $('#search');
var family = $('#family');
var origin = $('#origin');
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
var commonNames = [];
var categories = [];
var hangingPlants = [];
var fernPlants = [];
var cactussucculentPlants = [];
var flowerPlants = [];
var foliagePlants = [];
var palmPlants = [];
var listItem = $('<li>');
var getAllImages = [];
var imglatin = new Object();


var commonNames = [];

// var commonNames = ["lipstick", "lily", "maindenhair", "delta maindenhair", "silver vase", "century plant", "coral berry", "thread agave", "chinese evergreen",
// "manila pride", "blue agave", "jubilee"];
var listItem = $('<li>');

$(function(){
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

    fetch(`https://house-plants2.p.rapidapi.com/`, options2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for(var i = 0; i < data.length; i++){
                var secondLatin = data[i]['Latin name'];
                secondLatin = secondLatin.split('\'')[0];
                secondLatin = secondLatin.split(' ').join('');
                imglink = data[i].img;
                imglatin = {
                    latinname: secondLatin,
                    imgsource: imglink
                }
                getAllImages.push(imglatin);                
            }
        })
        .catch(function (err) {  
            console.error(err);
        });

    filter.click(function (e) { 
        categoryFilter.show();
    });
    
    getAllCommonNames();
    
    function getAllCommonNames(){
        fetch('https://house-plants.p.rapidapi.com/all', options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for(var i = 0; i < data.length; i++){

                    var category = data[i].category;
                    var latinName = data[i].latin;
                    switch(category){
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

                    for(var j = 0; j < data[i].common.length; j++){
                        commonNames.push(data[i].common[j].toLowerCase());
                    } 
                }
            })

            .catch(function (err) {  
                console.error(err);
            });    
    };


    function hangingArray(hanging, latin){
        for(var j = 0; j < hanging.length; j++){
            hangingPlants.push(hanging[j] + "(" + latin + ")");
        }
    }
    function fernArray(fern, latin){
        for(var j = 0; j < fern.length; j++){
            fernPlants.push(fern[j] + "(" + latin + ")");
        }
    }
    function cactussucculentArray(cactussucculent, latin){
        for(var j = 0; j < cactussucculent.length; j++){
            cactussucculentPlants.push(cactussucculent[j] + "(" + latin + ")");
        }
    }
    function flowerArray(flower, latin){
        for(var j = 0; j < flower.length; j++){
            flowerPlants.push(flower[j] + "(" + latin + ")");
        }
    }
    function foliageArray(foliage, latin){
        for(var j = 0; j < foliage.length; j++){
            foliagePlants.push(foliage[j] + "(" + latin + ")");
=======
    plantName.keyup(function (e) { 
        family.text('');
        origin.text('');
        climate.text('');
        tempMax.text('');
        tempMin.text('');
        idealLight.text('');
        toleratedLight.text('');
        watering.text('');
        $('li').each(function(){
            $(this).remove();
        });
        var name = $(this).val().toLowerCase();
        for (i = 0; i < commonNames.length; i++) {
            if (commonNames[i].startsWith(name) && name != '')
            {
                var listItem = $('<li>');
                listItem.text(commonNames[i]);
                commonNamesList.append(listItem);
                $('li').click(function() {
                    retrievePlantInfo($(this).text());
                });
            }
        }
    }
    
    function palmArray(palm, latin){
        for(var j = 0; j < palm.length; j++){
            palmPlants.push(palm[j] + "(" + latin + ")");
        }
    }

    hangingButton.click(function (e) { 
        e.preventDefault();
        allPlantsInThisCategory(hangingPlants);
    });
    fernButton.click(function (e) { 
        e.preventDefault();
        allPlantsInThisCategory(fernPlants);
    });
    succulentButton.click(function (e) { 
        e.preventDefault();
        allPlantsInThisCategory(cactussucculentPlants);
    });
    flowerButton.click(function (e) { 
        e.preventDefault();
        allPlantsInThisCategory(flowerPlants);
    });
    foliagePlantButton.click(function (e) { 
        e.preventDefault();
        allPlantsInThisCategory(foliagePlants);
    });
    palmButton.click(function (e) { 
        e.preventDefault();
        allPlantsInThisCategory(palmPlants);
    });


    function allPlantsInThisCategory(currentCategoryArray){
        plantName.keyup(function (e) { 
            plantImage.attr('src', '');
            family.text('');
            category.text('');
            origin.text('');
            latin.text('');
            climate.text('');
            tempMax.text('');
            tempMin.text('');
            idealLight.text('');
            toleratedLight.text('');
            watering.text('');
            $('li').each(function(){
                $(this).remove();
            });
            var name = $(this).val().toLowerCase();
            for (i = 0; i < currentCategoryArray.length; i++) {
                var commonName = currentCategoryArray[i].toLowerCase();
                if (commonName.startsWith(name) && name != '')
                {
                    var listItem = $('<li>');
                    listItem.text(currentCategoryArray[i]);
                    commonNamesList.append(listItem);
                    $('li').click(function() {
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
    });
    
    function retrievePlantInfo(name){
        var latinName = name.split('(')[1];
        latinName = latinName.split(' ').join('');
        latinName = latinName.slice(0, -1);

        fetch(`https://house-plants.p.rapidapi.com/latin/${latinName}`, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var imagesourcelink;
                for(var i=0; i<getAllImages.length; i++){
                    console.log("1: " + latinName);
                    console.log("2: " + getAllImages[i].latinname);
                    if(latinName.toLowerCase() === getAllImages[i].latinname.toLowerCase()){
                        console.log("Image Source : " + getAllImages[i].imgsource);
                        imagesourcelink = getAllImages[i].imgsource;
                    }   
                }
                plantImage.attr('src', imagesourcelink);
                family.text(data[0].family);
                origin.text(data[0].origin);
                latin.text(data[0].latin);
                climate.text(data[0].climate);
                tempMax.text(data[0].tempmax.celsius);
                tempMin.text(data[0].tempmin.celsius);
                idealLight.text(data[0].ideallight);
                toleratedLight.text(data[0].toleratedlight);
                watering.text(data[0].watering);
            })
            .catch(function (err) {  
                console.error(err);
            });
    };