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

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    var image = ("<img>");
    var imageURL = response[0].images.fixed_height_still.url;
    image.attr("src", imageURL);
    //image.attr("alt", "")
    $("#gif-container").append(image);

  });

});

});
