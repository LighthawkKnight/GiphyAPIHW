// Default topics
const defaultTopics = ["It's over 9000", "Pikachu", "This Is So Sad Alexa Play Despacito", "Lebron James U bum"];

// Button array
var topic = defaultTopics;

// Add topic button handler.  Adds entered topic into the button array and then resets display
$("#add-topic").on("click", function(event) {
  event.preventDefault();
  var topicInput = $('#topic-input').val().trim();
  topic.push(topicInput);
  displayButtons();
});

// Displays buttons in the buttons array
function displayButtons() {
  $('#buttons').empty();
  for (var i = 0; i < topic.length; i++) {
	var newButton = $('<button>');
	newButton.attr("topic", topic[i]).text(topic[i]).addClass("topic");
	$('#buttons').append(newButton);
  }
}

// Display gifs from #buttons element
$("#buttons").on("click", ".topic", function() {
    
    var topic = $(this).attr("topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
		console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");
          var rating = results[i].rating;
		  var caption = $("<p class = 'pt-1'>").text("Rating: " + rating);
		  // I can't find the direct link from the api
		  var dlform = $('<form method = "get" action = "https://media.giphy.com/media/' + results[i].id + '/giphy.gif">');
		  var dlbutton = $('<button class="btn btn-info btn-sm pt-1" type="button">').text("Download");
		  var img = $("<img>");
		  
		  img.addClass("gif");
		  img.attr("src", results[i].images.fixed_height_still.url);
		  img.attr("alt", topic);
		  img.attr("switch", results[i].images.fixed_height.url);
		  dlform.append(dlbutton);
		  caption.append(dlform);
          gifDiv.prepend(caption);
          gifDiv.prepend(img);
          $("#gifs").prepend(gifDiv);
        }
      });

});

// Gif switch still/animated
$(document.body).on("click", ".gif", function() {
	var temp = $(this).attr("switch");
	$(this).attr("switch", $(this).attr("src"));
	$(this).attr("src", temp);
});



displayButtons();