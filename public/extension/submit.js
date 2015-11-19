var pillage = function(tab,data){
  // Send Data to server
  var currentURL;
  // var request = new XMLHttpRequest();
  var array = $('#tags').val().split("");
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    currentURL = tabs[0].url;
});
  $.ajax({
    method: 'POST',
    url: "test.html",
    crossDomain: true,
    dataType: 'jsonp',
    data: {tags: array, currentURL: currentURL},
    success: function(){
      console.log('hello');
    }
  }).done(function() {
    $( this ).addClass( "done" );
  });
  // request.open('POST',url,true);
}
// console.log('testing');
window.onload = base; //performs checks when the page is loaded
$( document ).ready(function() {
    document.getElementById("tagSubmission").addEventListener("click",pillage);
});
