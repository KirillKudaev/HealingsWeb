Parse.initialize("518e0dbca14e73748f81e550e12deea515ff959e");
Parse.serverURL = 'http://ec2-35-165-199-91.us-west-2.compute.amazonaws.com:80/parse';
//pulls all of the healing posts in decending order
//starting from the most recent post
  function queryFromDatabase(){
    var healings = Parse.Object.extend("Healing");
  	var query = new Parse.Query(healings);
    //using healings object

   query.descending("updatedAt");
    query.find({
    success: function(results) {
      //alert("Successfully retrieved " + results.length + " foos.");

      //print out each object in its own paragraph
      for(var i = 0; i < results.length; i++){
        var object = results[i];
        document.getElementById("pullData").innerHTML += "<h4>" + object.get("title") + "</h4><p>" + object.get("body") + "</p>";
      }
    },
  error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
  };

  //creates a new account requiring:
  //email, username, password, first and last name
  //has a check to make assure you have entered the same
  //password twice
  function signup(){
  $("#signup").click(function(event){
    event.preventDefault();

    //build a check for password and require all values
    var username = $("#createUsername").val();
    var password = $("#createUserPass").val();
    var firstname = $("#createFirstname").val();
    var lastname = $("#createLastname").val();
    //var email = $("#createEmail").val();
    
    //create new user
    var user = new Parse.User();

    //set values for user
    user.set("username", username);
    user.set("password", password);
    user.set("firstName", firstname);
    user.set("lastName", lastname);
    //user.set("email", email);

      //create the account
      user.signUp( null, {
          success:function(user){

          }, error: function(user, error){
           console.error("signup error:", error)
          }
      });
  });
  };


  //posts a healing, with anonymous capabilities
  function healingsPost(){
  $("#postbtn").click(function(event){
    Parse.initialize("518e0dbca14e73748f81e550e12deea515ff959e");
    Parse.serverURL = 'http://ec2-35-165-199-91.us-west-2.compute.amazonaws.com:80/parse';
    event.preventDefault();

    //build a check for password and require all values
    var title = $("#title").val();
    var body = $("#body").val();
    var anon = $("#anon").is(':checked');

    var currUser = Parse.User;
    var currName = currUser.username;
    //set user value with who is logged in currently

    //make a new healing object
    var Healing = Parse.Object.extend("Healing");
    var newHealing = new Healing();

    //store info in that object
    newHealing.set("title", title);
    newHealing.set("body", body);
    newHealing.set("anon", anon);
    newHealing.set("username", currName);

    //save the healng contents
    newHealing.save(null, {
      success: function(Healing) {
        alert('New healing created with title: ' + Healing.get("title"));
    
      }, error: function(Healing, error) {
        console.error('Failed to create new healing, with error code: ' + error.message);
      }
    });
  });
  };


  //grabs variables in login form logs in
  //the user to their correct account
  function login(){
  $("#loginbtn").click(function(event){
    event.preventDefault();

    var loginUser = $("#loginUsername").val();
    var loginPass = $("#loginPassword").val();

    alert(loginUser + " " + loginPass);

    Parse.User.logIn(loginUser, loginPass, {
      success: function(user) {
        console.log(Parse.Session.current());
        //send user to their feed page
        // Do stuff after successful login.
      },
      error: function(user, error) {
        console.log(user + error);
        // The login failed. Check error to see why.
      }
  });
  });
  };

  // function logout(){
  //    http://stackoverflow.com/questions/29952249/how-to-create-log-out-script-parse-javascript
  //   $("$logout").click(function(event)){
  //     if(Parse.User.current())
  //     Parse.User.logout();
  //   }
  // }

