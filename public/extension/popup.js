//Check if Incognito
var signedIn = false;
function base(tab,data){
  if(tab.incognito){
    //change the popup body
    console.log('not working');
  } else{
    //check for logged in

    }
    if(!signedIn){
      //On click scrape the page for data
        //chrome browser action onclicked listener
        //Active Tab run script
        // $('.dataEntry').hide();
        // base
    } else{
      // $('.login').hide();
      $('.dataEntry').show();
      pillage(tab,data);
    }
}

var login = function(){
  $('#un').val();
  $('#pw').val();
  var redirectUri = chrome.identity.getRedirectURL("oauth2");  //not sure

  // chrome.identify.launchWebAuthFlow(
  //   {'url': '<url-to-do-auth>', 'interactive': true},
  //   function(redirect_url) { /* Extract token from redirect_url */ });
  //send as a JSON Object
  //wait for a response
    //change logged in to true
      //run base
}
var pillage = function(tab,data){
  if(signedIn){
    // Send Data to server
    var url = 'www.google.com';
    var request = new XMLHttpRequest();
    request.open('POST',url,true);
  } else{
    console.log("please log in");
  }
}
// console.log('testing');
window.onload = base; //performs checks when the page is loaded
