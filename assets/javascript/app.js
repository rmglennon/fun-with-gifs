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
      ratingText.addClass("rating");

      // Creating and storing an image tag
      var foodImage = $("<img>");
      foodImage.addClass("img-fluid pic");
      // foodImage.attr("data-state", "still");

      foodImage.attr("data-still", results[i].images.fixed_height_still.url);

      foodImage.attr("src", results[i].images.fixed_height_still.url);
      // foodImage.attr("data-state", "animated");
      foodImage.attr("data-animated", results[i].images.fixed_height.url);

      foodImage.attr("data-state", "still");

      // Appending the paragraph and image tag to the animalDiv
      foodDiv.append(ratingText);
      foodDiv.append(foodImage);

      // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
      $("#gif-container").prepend(foodDiv);
    }

  });

});

// check again for buttons created after document was loaded
$(document.body).on("click", ".pic", function() {


      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

});
