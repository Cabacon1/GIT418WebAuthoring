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
                                <p class="ingredients">Ingredients: ${Array.isArray(data[i].ingredients) ? data[i].ingredients.join(", ") : "N/A"}</p>
                                <button class="pickFavoriteButton" onclick="pickFavorite(${data[i].id})">Pick as Favorite</button>
                            </div>`;
        // Append the menu item to the menu list
        // Use jQuery to append the menu item to the menu list  
        $("#menuList").append(menuItem);
    }
}).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("Error: " + textStatus + " " + errorThrown);
    // Display an error message to the user
    $("#menuList").html("<p>Sorry, there was an error loading the menu. Please try again later.</p>");
}
).always(function () {
    console.log("Always");
    // This code will always run, regardless of success or failure
    // You can use this to hide loading indicators or perform cleanup tasks
    $("#loading").hide(); // Hide the loading indicator
});

let favoriteList = [];

function pickFavorite(drinkId) {
    // Check if the drink is already in the favorite list
    if (favoriteList.includes(drinkId)) {
        console.log(`Drink ID ${drinkId} is already in the favorite list.`);
        return;
    }
    // Add the drink to the favorite list
    favoriteList.push(drinkId);
    console.log(`Drink ID ${drinkId} has been added to the favorite list.`);
    // Display the updated favorite list
    displayFavoriteList();

    //Store Favorite List in Local Storage
    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    // Retrieve Favorite List from Local Storage
    const storedFavoriteList = localStorage.getItem("favoriteList");
    if (storedFavoriteList) {
        favoriteList = JSON.parse(storedFavoriteList);
    } else {
        favoriteList = [];
    }
}


function displayFavoriteList() {

    $("#favoriteList").empty();
    for (let i = 0; i < favoriteList.length; i++) {

        // Create a favorite item element
        // Use template literals to create the favorite item element
        //use the favoriteList[i] to gather the same data as the menuList
        const favoriteItem = `<div class="favoriteItem"> 
                                <h2>Favorite Drink ID: ${favoriteList[i]}</h2>
                                <img src="https://api.sampleapis.com/coffee/iced/${favoriteList[i]}.jpg" alt="Favorite Drink ID: ${favoriteList[i]}">
                                <p>Drink ID: ${favoriteList[i]}</p>
                            </div>`;



        // Append the favorite item to the favorite list
        // Use jQuery to append the favorite item to the favorite list  
        $("#favoriteList").append(favoriteItem);
    }
    console.log("Favorite List: ", favoriteList);
    // Display the favorite list in the console
    console.log("Favorite List: ", favoriteList);
}

// Add event listener to the button to clear the favorite list
$("#clearFavoritesButton").on("click", function () {
    // Clear the favorite list
    favoriteList = [];
    // Display the updated favorite list
    displayFavoriteList();
});

// Add event listener to the button to load the favorite list from local storage
$("#loadFavoritesButton").on("click", function () {
    // Retrieve Favorite List from Local Storage
    const storedFavoriteList = localStorage.getItem("favoriteList");
    if (storedFavoriteList) {
        favoriteList = JSON.parse(storedFavoriteList);
        // Display the updated favorite list
        displayFavoriteList();
    } else {
        console.log("No favorite list found in local storage.");
    }
});
// Add event listener to the button to clear the favorite list from local storage
$("#clearFavoritesLocalStorageButton").on("click", function () {
    // Clear the favorite list from local storage
    localStorage.removeItem("favoriteList");
    // Clear the favorite list in the app
    favoriteList = [];
    // Display the updated favorite list
    displayFavoriteList();
});


