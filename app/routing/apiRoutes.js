
var friends = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  // API GET Requests for JSON friends list
  
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

// API Post request user input form submit to server 
  app.post("/api/friends", function(req, res) {
  // set initial Match and first scoreDiff to compare 
   var Match ={
     name: "",
     photo: "",
     scoreDiff: 500
   };

// Variables to hold user input info 
var userData =req.body;
var userScores =userData.scores;
var userName =userData.name;
var userPhoto =userData.photo
  
// Variable to hold difference between user score and friend score 
var Difference =0;

//set number of questions to 10
var numberQuestions =10;

//use for loop to go through array of friends to get each friends scores
for (var i=0; i<friends.length -1;i++){
 console.log(friends[i].name);

 //reset Difference variable to start count of next friend to compare
  Difference =0;

//loop to get absolute difference between friend and user scores
for( var j=0;j< numberQuestions;j++) {
Difference += Math.abs(parseInt(userScores[j])- parseInt(friends[i].scores[j]));

//compare to see if current difference score is best match 
if (Difference <= Match.scoreDiff){
//set to new best match

  Match.name =friends[i].name;
  Match.photo =friends[i].photo;
  Match.scoreDiff = Difference;
        }
    }
}
// push to database
friends.push(userData);

// return Json data with users bestMatch
res.json(Match)

 });

};
