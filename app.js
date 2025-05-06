"use strict";

// This is the JavaScript file for the Coffee API project
// This file will contain all the JavaScript code for the project
// It will handle the API calls, display the menu items, and manage favorites
let coffeeData = [];

let menuList = $("#menuList");
$.ajax({
    url: `https://api.sampleapis.com/coffee/iced`,
    dataType: "json",
}).done(function (data) {
    console.log("Done");
    console.log(data);

    // Store the data in the global variable
    coffeeData = data;

    // Loop through data and display the drinks
    $("#menuList").empty();
    for (let i = 0; i < data.length; i++) {
        const menuItem = `<div class="menuItem"> 
                                <h2>${data[i].title}</h2>
                                <img src="${data[i].image}" alt="${data[i].title}">
                                <p>${data[i].description}</p>
                                <p class="ingredients">Ingredients: ${formatIngredients(data[i].ingredients)}</p>
                                <button class="pickFavoriteButton" onclick="pickFavorite(${data[i].id})">Pick as Favorite</button>
                            </div>`;
        $("#menuList").append(menuItem);
    }
});

// Function to pick a favorite and store it in local storage
function pickFavorite(id) {
    // Retrieve existing favorites from local storage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Find the selected menu item by ID using the global coffeeData
    const selectedItem = coffeeData.find(item => item.id === id);

    // Check if the item is already in favorites
    if (!favorites.some(fav => fav.id === id)) {
        favorites.push(selectedItem);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${selectedItem.title} has been added to your favorites!`);
    } else {
        alert(`${selectedItem.title} is already in your favorites.`);
    }

    // Update the favorites list display
    displayFavorites();
}

// Function to display favorites
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteList = $("#favoriteList");
    favoriteList.empty();

    if (favorites.length === 0) {
        favoriteList.html("<p class='noFav'>No favorites yet. Pick your favorite drinks!</p>");
    } else {
        favorites.forEach(favorite => {
            const favoriteItem = `<div class="favoriteItem">
                                    <h3>${favorite.title}</h3>
                                    <img src="${favorite.image}" alt="${favorite.title}">
                                    <p>${favorite.description}</p>
                                    <p class="ingredients">Ingredients: ${formatIngredients(favorite.ingredients || [])}</p>
                                  </div>`;
            favoriteList.append(favoriteItem);
        });
    }
}

// Helper function to format ingredients
function formatIngredients(ingredients) {
    return Array.isArray(ingredients) ? ingredients.join(", ") : "N/A";
}

// Function to clear all favorites
function clearFavorites() {
    localStorage.removeItem("favorites");
    displayFavorites();
    alert("All favorites have been cleared.");
}


// Event listener for the "Clear Favorites" button
$("#clearFavoritesButton").on("click", clearFavorites);

// Call displayFavorites on page load to show any existing favorites
$(document).ready(function () {
    displayFavorites();
});

// Event listener for the "Show Favorites" button
$("#showFavoritesButton").on("click", function () {
    $("#favoriteList").toggle();
    displayFavorites();
    $("#favoriteList").is(":visible") ? $(this).text("Hide Favorites") : $(this).text("Show Favorites");
});


