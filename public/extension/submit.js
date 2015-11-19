var pillage = function(tab,data){
  // Send Data to server
  var currentURL;
  var serverUrl = 'test'
  // var request = new XMLHttpRequest();
  var array = $('#tags').val().split("");
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    currentURL = tabs[0].url;
});
  $.ajax({
    method: 'POST',
    url: serverUrl,
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
var linkOpener = function(){
  console.log('openPlease');
  var newURL = "http://stackoverflow.com/"; //update with correct url
  chrome.tabs.create({ url: newURL });
}
// console.log('testing');

$( document ).ready(function() {
    document.getElementById("tagSubmission").addEventListener("click",pillage);
    document.getElementById("outerLink").addEventListener("click",linkOpener);
    chrome.extension.onRequest.addListener(function(request, sender) {
      chrome.tabs.update(sender.tab.id, {url: request.redirect});
    });
});
