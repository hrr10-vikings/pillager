//Check if Incognito
var signedIn = false;
var serverUrl = 'http://127.0.0.1:8080/api/users/signin';
function base(tab,data){

  if(tab.incognito){ //Local storage has a token
    //change to the submit page
    console.log('not working');
  }
}

var login = function(un,pw){
  un = un || $('#un').val();
  pw = pw || $('#pw').val();
  var creds = {username: un, password: pw}
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    url: serverUrl,
    data: JSON.stringify(creds),
    success: function(data){
      // chrome.extension.getURL("./submit.html")
      chrome.storage.sync.set({'pillageToken': data.token}, function() {
         // Notify that we saved.
         console.log(data.token);
       });

      //add token into local storage
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
$( document ).ready(function() {
    document.getElementById("signInButton").addEventListener("click",login);
});
