var token;
chrome.storage.sync.get('pillageToken', function(result){
  token = result.pillageToken;
})
var pillage = function(tab,data){
  // Send Data to server
  var currentURL;
  var serverUrl = 'http://pillager-staging.herokuapp.com/api/urls'
  // var request = new XMLHttpRequest();
  var array = $('#tags').val();
  array = array.split(',').map(function(str) {return str.trim()})
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    currentURL = tabs[0].url;
});
  $.ajax({
    method: 'POST',
    headers: {"x-access-token":token},
    contentType: 'application/json',
    url: serverUrl,
    data: JSON.stringify({tags: array}),
    success: function(res){
      console.log(res);
    }
  })
  // request.open('POST',url,true);
}
var linkOpener = function(){
  console.log('openPlease');
  var newURL = 'https://pillager-staging.herokuapp.com'; //update with correct url
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
