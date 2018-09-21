// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFVt192mOHELzkI-hX_L-0STEn_YFUzYo",
    authDomain: "train-cfff5.firebaseapp.com",
    databaseURL: "https://train-cfff5.firebaseio.com",
    projectId: "train-cfff5",
    storageBucket: "train-cfff5.appspot.com",
    messagingSenderId: "222220879607"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = $("#first-train-input").val().trim();
    var frequencyRate = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      rate: frequencyRate
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var frequencyRate = childSnapshot.val().rate;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(frequencyRate);
  
    // Prettify the train start
    var trainStartCon = moment(trainStart, "hh:mm").subtract(1,"year");
  
    // Current Time
    var currentTime = moment ();

    // Difference between the times
    var differentTime = moment().diff(moment(trainStartCon, "minutes"));
    console.log(differentTime);
  
    // Time Apart
    var timeApart = differentTime % frequencyRate;
    console.log(timeApart);
  
    //Minutes until train
    var minutesAway = frequencyRate - timeApart;
    console.log(minutesAway);

    // Next train
    var nextTrain = moment().add(minutesAway, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(frequencyRate),
      $("<td>").text(catchTrain),
      $("<td>").text(minutesAway),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  