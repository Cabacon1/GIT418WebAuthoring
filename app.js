"use strict";
// This is the JavaScript file for the Coffee API project
// This file will contain all the JavaScript code for the project


console.log("Hello, World!");


let menuList = $("#menuList");
$.ajax({
    //url: `${urlStart}${apiKey}${urlEnd}`,
    url: `https://api.sampleapis.com/coffee/iced`,
    dataType: "json",
}).done(function (data) {
    console.log("Done");
    console.log(data);
    // Loop through data and pull out all the drinks and info for each of them
    // Display whatever you want on the page
    // For now, just display the name of the drink and the image of the drink

    $("#menuList").empty();
    for (let i = 0; i < data.length; i++) {
        const menuItem = `<div class="menuItem"> 
                                <h2>${data[i].title}</h2>
                                <img src="${data[i].image}" alt="${data[i].title}">
                                <p>${data[i].description}</p>
                                <p>Ingredients: ${Array.isArray(data[i].ingredients) ? data[i].ingredients.join(", ") : "N/A"}</p>
                                <button class="pickFavoriteButton" onclick="pickFavorite(${data[i].id})">Pick as Favorite</button>
                            </div>`;
        // Append the drink item to the coffeeOptions div
        // Use jQuery to append the drink item to the coffeeOptions div

        $("#menuList").append(menuItem);
    }
});


let favoritesListDiv = $("#favoritesListDiv");
// This will be the div that will display the favorites list on the page

favoritesListDiv.hide();

// Add pickFavorite selection to the favorites list
// This function will take the id of the drink as a parameter and add it to the favorites list
// The function will also display the favorites list on the page
function pickFavorite(drinkId) {
    // Check if the drink is already in the favorites list
    const drink = favoritesList.find((drink) => drink.id === drinkId);
    if (drink) {
        alert("This drink is already in your favorites list.");
        return;
    }
    // If the drink is not in the favorites list, add it to the favorites list
    const newDrink = { id: drinkId, name: `Drink ${drinkId}` };
    favoritesList.push(newDrink);
    console.log(favoritesList);
    // Display the favorites list on the page
    showFavorites();
}



