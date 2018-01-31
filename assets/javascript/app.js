var topics = ["cookie", "cupcake", "banana", "cheese", "pizza", "tofu", "pie", "lettuce", "ice cream", "salad", "apple", "strawberry", "burrito", "soup", "taco", "watermelon", "chocolate", "pasta", "water", "pineapple"];

for (var i = 0; i < topics.length; i++) {
  var newButton = $("<button>");
  newButton.text(topics[i]);
  newButton.addClass("buttons")
}

// var queryURL = "https://api.giphy.com/v1/gifs/trending?";
// var api_key = "2Djlw2Z3UfS0QNM9FkTSOO3bh0o3KOoc"
//
//
// $.ajax({
//   url: queryURL,
//   method: 'GET'
// }).then(function(response) {
//   console.log(response);
//
//
// });
