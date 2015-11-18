//Check if Incognito
function base(tab,data){
  if(tab.incognito){
    //change the popup body
  } else{
    //check for logged in
    chrome.identify.launchWebAuthFlow{
      {'url': '<url-to-do-auth>', 'interactive': true},
      function(redirect_url) { /* Extract token from redirect_url */ });
    }
    if(/* loggined in*/){
      //On click scrape the page for data
        //chrome browser action onclicked listener
        //Active Tab run script
    } else{

    }
  }
}

var pillage(tab,data){
  // Send Data to server
}
