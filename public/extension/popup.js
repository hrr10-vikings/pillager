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
  var un = $('#un').val();
  var pw = $('#pw').val();
  var creds = {username: un, password: pw}
  $.ajax({
    method: 'POST',
    url: "OUR_DATABASE",
    context: creds,
    success: function(){
      chrome.extension.getURL("./submit.html")
      //not sure how to redirect
    },
    failure: function(){
      console.log("incorrect information");
    }
  }).done(function() {
    chrome.storage.sync.set({'pillageLogin': creds}, function() {
         // Notify that we saved.
         console.log('Settings saved');
       });
  });

}
// console.log('testing');
window.onload = base; //performs checks when the page is loaded
