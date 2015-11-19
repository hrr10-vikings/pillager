//Check if Incognito
var signedIn = false;
//backup 'http://127.0.0.1:8080/api/users/signin';
var serverUrl = 'https://pillager-staging.herokuapp.com/api/users/signin';
function base(tab,data){

  // if(chrome.storage.get('pillageToken', function(object items){//Local storage has a token
  //
  // })){
  //   //change to the submit page
  //
  // } else {
  // //render login
  // }
}

var login = function(un,pw){
  console.log('testing');
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
         //change to submit
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
