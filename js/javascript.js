function queryFromDatabase(){
	Parse.initialize("518e0dbca14e73748f81e550e12deea515ff959e");
	Parse.serverURL = 'http://ec2-35-165-199-91.us-west-2.compute.amazonaws.com:80/parse';
  var healings = Parse.Object.extend("Healing");
	var query = new Parse.Query(healings);
  //using healings object

 query.descending("updatedAt");
  query.find({
  success: function(results) {
    alert("Successfully retrieved " + results.length + " foos.");
    // Do something with the returned Parse.Object values
    for(var i = 0; i < results.length; i++){
      var object = results[i];
      document.getElementById("pullData").innerHTML += "<h4>" + object.get("title") + "</h4><p>" + object.get("body") + "</p>";
    }
  },
error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
}



$("#signup").submit(function(event){
  Parse.initialize("518e0dbca14e73748f81e550e12deea515ff959e");
  Parse.serverURL = 'http://ec2-35-165-199-91.us-west-2.compute.amazonaws.com:80/parse';
  event.preventDefault();

  //build a check for password and require all values
  var username = $("#username").val();

  //Check to assure password accuracy, only sets if both are the same
  if($("#userPass").val() == $("#passcheck").val())
  { var password = $("#userPass").val();}

  var firstname = $("#firstname").val();
  var lastname = $("#lastname").val();
  var email = $("#email").val();

  var user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("firstName", firstname);
  user.set("lastName", lastname);
  user.set("email", email);

  user.signUp(null, {
      success:function(user){

      }, error: function(user, error){
        console.log("signup error:"+error.message)
      }
  });
});