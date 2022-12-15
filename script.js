var plantName = $('#plantName');
var categoryArrayList = $('#categoryArrayList');
var searchButton = $('#search');
var family = $('#family');
var category = $('#category');
var origin = $('#origin');
var climate = $('#climate');
var tempMax = $('#tempmax');
var tempMin = $('#tempmin');
var idealLight = $('#ideallight');
var toleratedLight = $('#toleratedlight');
var watering = $('#watering');
var selectedCategory = $('#selectedCategory');
var commonNames = [];
var categories = [];
var hanging = [];
var fern = [];
var bromeliad = [];
var cactussucculent = [];
var aglaonema = [];
var listItem = $('<li>');

// var commonNames = ["lipstick", "lily", "maindenhair", "delta maindenhair", "silver vase", "century plant", "coral berry", "thread agave", "chinese evergreen",
// "manila pride", "blue agave", "jubilee"];


$(function(){

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a9893fa65emsh05499dc68ccba82p199e67jsnbfdbb0594c96',
            'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
        }
    };

    getAllCommonNames();

    function getAllCommonNames(){
        fetch('https://house-plants.p.rapidapi.com/all', options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for(var i = 0; i < data.length; i++){
                    var category = data[i].category;
                    if (category === 'Hanging') {
                        for(var j = 0; j < data[i].common.length; j++){
                            hanging.push(data[i].common[j].toLowerCase());
                        }
                    } else if (category === 'Fern') {
                        for(var j = 0; j < data[i].common.length; j++){
                            fern.push(data[i].common[j].toLowerCase());
                        } 
                    } else if (category === 'Bromeliad') {
                        for(var j = 0; j < data[i].common.length; j++){
                            bromeliad.push(data[i].common[j].toLowerCase());
                        }
                    } else if (category === 'Cactus & Succulent') {
                        for(var j = 0; j < data[i].common.length; j++){
                            cactussucculent.push(data[i].common[j].toLowerCase());
                        } 
                    } else if (category === 'Aglaonema') {
                        for(var j = 0; j < data[i].common.length; j++){
                            aglaonema.push(data[i].common[j].toLowerCase());
                        } 
                    }
           
                    if (!(categories.includes(data[i].category))){
                        categories.push(data[i].category);
                    }
                    for(var i = 0; i < categories.length; i++){
                        console.log("Category : " + categories[i]);
                    } 
                }
            })
            .catch(function (err) {  
                console.error(err);
            });    
    };

    selectedCategory.change(function(){
        var category = $(this).val();
        console.log("Category : " + category);
        if (category === 'hanging') {
            allPlantsInThisCategory(hanging);
        } else if (category === 'fern') {
            allPlantsInThisCategory(fern); 
        } else if (category === 'bromeliad') {
            allPlantsInThisCategory(bromeliad);  
        } else if (category === 'cactussucculent') {
            allPlantsInThisCategory(cactussucculent); 
        } else if (category === 'aglaonema') {
            allPlantsInThisCategory(aglaonema); 
        }
    });

    function allPlantsInThisCategory(categoryArray){
        plantName.keyup(function (e) { 
            family.text('');
            category.text('');
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
            for (i = 0; i < categoryArray.length; i++) {
                if (categoryArray[i].startsWith(name) && name != '')
                {
                    var listItem = $('<li>');
                    listItem.text(categoryArray[i]);
                    categoryArrayList.append(listItem);
                    $('li').click(function() {
                        retrievePlantInfo($(this).text());
                    });
                }
            }
        });
    }

    function retrievePlantInfo(name){
        var name = name.split(' ').join('')
        fetch(`https://house-plants.p.rapidapi.com/common/${name}`, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                family.text(data[0].family);
                category.text(data[0].category);
                origin.text(data[0].origin);
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
});

    // searchButton.click(function (e) {    
    //     e.preventDefault();
    // });



    //  All code above this line has been validated
// Lines below are space holder for Survarna Code 12/14 to 12/15


































































































// Everything below this line is code space for Brian 12/15 to 12/15













