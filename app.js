"use strict";

    console.log("Hello, World!");
    let coffeeOptions = $("#coffeeOptions");
    $.ajax({
        //url: `${urlStart}${apiKey}${urlEnd}`,
        url: `https://api.sampleapis.com/coffee/hot`,
        dataType: "json",
    }).done(function (data) {
        console.log("Done");
        console.log(data);
        // Loop through data and pull out all the drinks and info for each of them
        // Display whatever you want on the page
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);
            console.log(data[i].description);
            console.log(data[i].image);
            console.log(data[i].ingredients);
            console.log(data[i].id);
            // Create a div for each drink and append it to the page
            let drinkDiv = $("<div></div>");
            drinkDiv.append(`<h2>${data[i].title}</h2>`);
            drinkDiv.append(`<p>${data[i].description}</p>`);
            drinkDiv.append(`<img src="${data[i].image}" alt="${data[i].title}">`);
            drinkDiv.append(`<p>Ingredients: ${data[i].ingredients.join(", ")}</p>`);
            drinkDiv.append(`<button onclick="pickFavorite(${data[i].id})">Pick as Favorite</button>`);
            $("#coffeeOptions").append(drinkDiv);
        }
    
    })


function pickFavorite() {
    // Save whichever drink they picked as their favorite
}

function remindThemWhatTheirFavoriteIs() {
    // Pull from storage and print all the details about it
}