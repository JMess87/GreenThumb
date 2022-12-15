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
    
    getAllCommonNames();
    
    function getAllCommonNames(){
        fetch('https://house-plants.p.rapidapi.com/all', options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for(var i = 0; i < data.length; i++){
                    for(var j = 0; j < data[i].common.length; j++){
                        commonNames.push(data[i].common[j].toLowerCase());
                    } 
                }
            })
            .catch(function (err) {  
                console.error(err);
            });    
    };

    plantName.keyup(function (e) { 
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
    });

    function retrievePlantInfo(name){
        var name = name.split(' ').join('')
        fetch(`https://house-plants.p.rapidapi.com/common/${name}`, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                family.text(data[0].family);
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



