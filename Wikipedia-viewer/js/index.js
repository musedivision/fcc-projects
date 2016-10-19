// live search: this presearches. everytime that the user clicks the search box it returns options.
// return objects needed - page title; page first sentence; page main image
// use these too create canvas of search card suggestions that can be returned
function search() {
  var $input = $("#searchBox").val();
  var $dataList = $("#wikiDatalist");
  $.ajax({
    url: "http://en.wikipedia.org/w/api.php",
    dataType: "jsonp",
    data: {
      'action': "opensearch",
      'format': "json",
      'search': $input,
      'limit': "10"
    },
    success: function(data) {
      //remove previous search options
      $("#wikiDatalist").children().remove();
      //create list of the retreived json list
      data[1].forEach(function(item) {
        var option = document.createElement('option');
        option.value = item;
        $dataList.append(option);
      });

    }
  });
}

function otherFunction() {
  //cache DOM
  var $input = $("#searchBox").val();
  var $apiBox = $("#apiBox");
  //
  $("#wikiDatalist").add("#apiBox").children().remove();
  $apiBox.removeClass("active");
  $.ajax({
    url: "http://en.wikipedia.org/w/api.php",
    dataType: "jsonp",
    data: {
      'action': "opensearch",
      'format': "json",
      'search': $input,
      'limit': "10"
    },
    success: function(data) {
      console.log(data);
      // was there results
      if (data[1].length == 0) {
        // if no results for query say sorry
        $(".noResult").addClass("active");
      } else {
        // remove anything inside the results box
        $apiBox.children().remove();
        $(".noResult").removeClass("active", function(){
          $(this).hide();
        });
      }

      // loop through list and create each card
      for (i = 0; i < data[1].length; i++) {
        //create div element
        var cardClass = "card " + i;
        var $card = $("." + i);
        $apiBox.append($("<a></a>", {
          class: i
        }));
        $("." + i).html("<h3>Title</h3><p>Paragraph</p>");
        // populate each card with rel info
        $("." + i + " h3").html(data[1][i]);
        $("." + i + " p").html(data[2][i]).parent().attr("href", data[3][i]);
      }
    }
  }).done(function() {
    // show cards with animation 
    $("#apiBox").addClass("active");
  });

}

$( document ).ready(function(){
  //when the search icon is clicked. slide title 
  $("#searchIcon").on('click', function(){
    $(this).css('display', 'none');
    $('#help').css('display', 'none');
    $('body').css('padding-top', '20px');
    $('input').css('display', 'inline-block');
  });
})