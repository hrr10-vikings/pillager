//Check if Incognito
var signedIn = false;
var serverUrl = 'http://127.0.0.1:8080';
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

var login = function(un,pw){
  un = un || $('#un').val();
  pw = pw || $('#pw').val();
  var creds = {username: un, password: pw}
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    url: 'http://127.0.0.1:8080/api/users/signin',
    data: JSON.stringify(creds),
    success: function(data){
      // chrome.extension.getURL("./submit.html")
      console.log(data.token);
      //not sure how to redirect
    },
    failure: function(){
      console.log("incorrect information");
    }
  })
  // .done(function() {
  //   chrome.storage.sync.set({'pillageLogin': creds}, function() {
  //        // Notify that we saved.
  //        console.log('Settings saved');
  //      });
  // });

}
// console.log('testing');
window.onload = base; //performs checks when the page is loaded
