Parse.initialize("518e0dbca14e73748f81e550e12deea515ff959e");
Parse.serverURL = 'http://ec2-35-165-199-91.us-west-2.compute.amazonaws.com:80/parse';
//pulls all of the healing posts in decending order
//starting from the most recent post
  function queryFromDatabase(){
    var healings = Parse.Object.extend("Healing");
  	var query = new Parse.Query(healings);
    //using healings object

   query.descending("createdAt");
    query.find({
    success: function(results) {
      //alert("Successfully retrieved " + results.length + " foos.");

      //print out each object in its own paragraph
      for(var i = 0; i < results.length; i++){
        var object = results[i];
        
        //date objects: when posted and current
        var posted = new Date(object.get("createdAt"));
        var now = new Date();

        //divide into workable and readable format
        var diff = new Date(now - posted);
        var minute = diff.getMinutes();
        var day = diff.getDate();
        var month = diff.getMonth()+1;  //zero index, +1 gets actual month
        var year = diff.getFullYear();  //new form of obj.getYear()

        //logic for date since posted
        var since = null;
        if(year > 1970) //base year
          since = year + " years ago";
        else if(month > 1)
          since = month + " months ago";
        else if(day > 0)
          since = day + " days ago";
        else if(minute > 0)
          since = minute + " minutes ago";
       
        //print each healing object into a div to page
        document.getElementById("displayhealings").innerHTML += ("<div class='healing'>"
          + "<h4>" + object.get('title') + "</h4>"
          + "<h5>Posted by: " + object.get('username') +  " " + since + "</h5>"
          + "<p>" + object.get('body') + "</p>"
          + "<input type='radio' value='liked'>Like"
          +"</div>");
      }
    },
  error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
  }

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
  }

  //posts a healing, with anonymous capabilities
  //$("#postbtn").click(healingPost());
  
  function healingsPost(){
    Parse.initialize("518e0dbca14e73748f81e550e12deea515ff959e");
    Parse.serverURL = 'http://ec2-35-165-199-91.us-west-2.compute.amazonaws.com:80/parse';

    //build a check for password and require all values
    var title = $("#title").val();
    var body = $("#body").val();
    var anon = $("#anon").is(':checked');

    var currUser = Parse.User.current();
    var username = currUser.getUsername();
    //set user value with who is logged in currently

    //make a new healing object
    var Healing = Parse.Object.extend("Healing");
    var newHealing = new Healing();

    //store info in that object
    newHealing.set("title", title);
    newHealing.set("body", body);
    newHealing.set("anon", anon);
    if(!anon) {
        newHealing.set("username", username);
    }

    //save the healng contents
    newHealing.save(null, {
      success: function(Healing) {
        alert('New healing created with title: ' + Healing.get("title"));
    
      }, error: function(Healing, error) {
        console.error('Failed to create new healing, with error code: ' + error.message);
      }
    });
  }


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
  }

  // function logout(){
  //    http://stackoverflow.com/questions/29952249/how-to-create-log-out-script-parse-javascript
  //   $("$logout").click(function(event)){
  //     if(Parse.User.current())
  //     Parse.User.logout();
  //   }
  // }

