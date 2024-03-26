//This file holds the code for the link to the data visualization page, it was previously  in the index page.
var h = $("#myHeader");
h.addClass("sticky");
insertFooterHere("main-content");

// Creating link to data vis page
var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
if (baseUrl.search("127.0.0.1") !== -1) {
  $("#vis-link").attr("href", `/data_visualizations.html`);
} else {
  $("#vis-link").attr("href", `${baseUrl}/data_visualizations.html`);  
}

// removes space between the first 2 blocks
var isThirds = true;
if($(window).width() < 951 && isThirds == true){
    isThirds = false;
    var fill = $("#filler");
    var firstDiv = fill.prev();
    var lastDiv = fill.next();
    firstDiv.removeClass("usa-width-one-third").addClass("usa-width-one-half");
    lastDiv.removeClass("usa-width-one-third").addClass("usa-width-one-half");
    fill.remove();
  }
$(window).resize(function(){
  if($(this).width() >= 951 && isThirds == false){
      isThirds = true;
      var fill = $('<div class="usa-width-one-third" id="filler"><div class="usa-hero-callout usa-section-dark" style="visibility: hidden"></div></div>');
      var firstDiv = $($(".usa-width-one-half")[2]);
      var lastDiv = $($(".usa-width-one-half")[3]);
      firstDiv.removeClass("usa-width-one-half").addClass("usa-width-one-third");
      lastDiv.removeClass("usa-width-one-half").addClass("usa-width-one-third");
      fill.insertBefore(lastDiv);
  }
  if($(this).width() < 951 && isThirds == true){
    isThirds = false;
    var fill = $("#filler");
    var firstDiv = fill.prev();
    var lastDiv = fill.next();
    firstDiv.removeClass("usa-width-one-third").addClass("usa-width-one-half");
    lastDiv.removeClass("usa-width-one-third").addClass("usa-width-one-half");
    fill.remove();
  }
})
