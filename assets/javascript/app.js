$(document).ready(function(){

createButtons();



function createButtons() {

  var topics = ["cookie", "cupcake", "banana", "cheese", "pizza", "tofu", "pie", "lettuce", "ice cream", "salad", "apple", "strawberry", "burrito", "soup", "taco", "watermelon", "chocolate", "mashed potatoes", "pasta", "water"];

  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.text(topics[i]);
    newButton.addClass("buttons");
    newButton.attr("data-topic", topics[i]);
    newButton.attr("id", topics[i]);
    $(".gif-buttons").append(newButton);
  }
}

$(".buttons").on("click", function() {
  // base URL for search endpoint (q=)
  var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
  var apiKey = "api_key=2Djlw2Z3UfS0QNM9FkTSOO3bh0o3KOoc";
  var searchTerm = $(this).text();
  var limit = 10; //default is 25
  var rating;

  var queryURL = baseURL + searchTerm + "&" + "limit="+ limit + "&" + apiKey;
    console.log("search term: " + searchTerm);
      console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {

    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var foodDiv = $("<div>");

      // Creating a paragraph tag with the result item's rating

      var ratingText = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var foodImage = $("<img>");
      // Setting the src attribute of the image to a property pulled off the result item
      foodImage.attr("src", results[i].images.fixed_height_still.url);

      // Appending the paragraph and image tag to the animalDiv
      foodDiv.append(rating);
      foodDiv.append(foodImage);

      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gif-container").prepend(foodDiv);
    }

  });

});

});
