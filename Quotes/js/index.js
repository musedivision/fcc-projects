$(document).ready(function() {
 // get quote from api on click
  var quoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?";
  
  
  $("#getQuote").on("click", function() {
    // change random bg-color
    var hue = (365 * Math.random())
    var color = "hsla(" + hue + ", 40%, 30%, 1)";
    
    $.getJSON(quoteUrl, function(json) {
        //  change text and author text         
        if(json.quoteAuthor === ""){
          $('#author').html("Unknown");
        } else {
          $('#author').html(json.quoteAuthor);
        }
        $('#quote').html(JSON.stringify(json.quoteText));
        $("body").css("background-color", color);
        //  change twitter button href to contain quote   
        var tweet = ("https://twitter.com/intent/tweet?text=" + json.quoteText + " - " + json.quoteAuthor);
        $('#twitter').attr("href", tweet);
    });
  });
});