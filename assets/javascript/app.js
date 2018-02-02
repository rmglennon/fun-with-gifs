$(document).ready(function(){

  // create an array of foods to pre-populate buttons
  var topics = ["cookie", "cupcake", "banana", "cheese", "macaroni and cheese", "watermelon", "kiwi", "pizza", "tofu", "pie", "lettuce", "ice cream", "apple", "strawberry", "potato chips", "burrito", "taco", "chocolate", "mashed potatoes", "pasta"];

  function createButtons() {

    // clear out buttons on start
    $("#gif-buttons").empty();

    // create buttons from array contents and add them to the page
    for (var i = 0; i < topics.length; i++) {
      var newButton = $("<button>");
      newButton.text(topics[i]);
      newButton.addClass("buttons btn btn-default");
      newButton.attr("data-topic", topics[i]);
      newButton.attr("id", topics[i]);
      $("#gif-buttons").append(newButton);
    }
  }

  // when button is clicked, send AJAX query to Giphy API
  $(document.body).on("click", ".buttons", function() {
    // base URL for search endpoint (q=)
    // get search term from button that was clicked
    // set a limit of 10 images to be returned
    var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "api_key=2Djlw2Z3UfS0QNM9FkTSOO3bh0o3KOoc";
    var searchTerm = $(this).text();
    var limit = 10;
    var rating;

    // construct query URL
    var queryURL = baseURL + searchTerm + "&" + "limit="+ limit + "&" + apiKey;

    // clear out existing elements in the main div before each click
    $("#gif-container").empty();

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {

      var results = response.data;

      // loop through buttons and add Giphy info
      for (var i = 0; i < results.length; i++) {

        // create div to hold images and rating text
        var foodDiv = $("<div>").attr("id", "food-div");

        // create p tag to hold rating
        var ratingText = $("<p>").text("Rating: " + results[i].rating);
        ratingText.addClass("rating");

        // create image tag to hold images and add classes
        var foodImage = $("<img>");
        foodImage.addClass("img-fluid pic rounded");

        // set data-still and data-animated property with the URL to the still and animated image
        foodImage.attr("data-still", results[i].images.fixed_height_still.url);
        foodImage.attr("src", results[i].images.fixed_height_still.url);
        foodImage.attr("data-animated", results[i].images.fixed_height.url);
        foodImage.attr("data-state", "still");

        // append the rating text and the images to divs
        foodDiv.append(ratingText);
        foodDiv.append(foodImage);

        // add to the main container to hold the GIFs on the HTML
        $("#gif-container").prepend(foodDiv);
      }
    });
  });

  // check for buttons created after document was loaded
  $(document.body).on("click", ".pic", function() {

    // create variable for data-state of what was clicked
    var state = $(this).attr("data-state");

    // if the data-state is still, update source to animated URL
    // if animated, then update to still image, and swap
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animated"));
      $(this).attr("data-state", "animated");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-food").on("click", function(event) {
    // prevent user from reloading the page when trying to submit
    event.preventDefault();

    // get text from input box
    var food = $("#food-input").val().trim();

    // make sure buttons with no text do not get created
    if (food.length > 0) {
      topics.push(food);
    }

    // create the buttons with input box text
    createButtons();

    // clear text box on submit
    $("#food-input").val("");
  });

  // start app by calling function to create initial set of buttons
  createButtons();

});
