//Check if Incognito
var signedIn = false;
function base(tab,data){
  if(tab.incognito){
    //change the popup body
    console.log('not working');
  } else{
    //check for logged in
    chrome.identify.launchWebAuthFlow(
      {'url': '<url-to-do-auth>', 'interactive': true},
      function(redirect_url) { /* Extract token from redirect_url */ });
    }
    if(!signedIn){
      //On click scrape the page for data
        //chrome browser action onclicked listener
        //Active Tab run script
        $('.dataEntry').hide();
        base
    } else{
      $('.login').hide();
      $('.dataEntry').show();
      pillage(tab,data);
    }
}

function testing(){

  // $('.dataEntry').show();
  console.log('testing');
}
var pillage = function(tab,data){
  // Send Data to server
  var url = 'www.google.com';
  var request = new XMLHttpRequest();
  request.open('POST',url,true);
}
// console.log('testing');
window.onload = testing; //performs checks when the page is loaded
