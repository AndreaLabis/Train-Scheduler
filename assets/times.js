  var firebaseConfig = {
  apiKey: "AIzaSyAZO1EPnDFJgKKYrAdoCoUat8S-gJCPHv4",
  authDomain: "train-schedule-14389.firebaseapp.com",
  databaseURL: "https://train-schedule-14389.firebaseio.com",
  projectId: "train-schedule-14389",
  storageBucket: "train-schedule-14389.appspot.com",
  messagingSenderId: "827371272497",
  appId: "1:827371272497:web:65fbae6fe80ea6aeaad810"
  };
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var train = "";
  var destination = "";
  var first= "";
  var frequency = "";
  var nextArrival = "";
  var minutesAway = "";
  var currentTime = moment();

  console.log('Current Time: ' + moment(currentTime).format('hh:mm:ss A'));
  
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    
    
    train = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    first = moment($("#first-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
    frequency = $("#frequency-input").val().trim();

    var database = firebase.database();
    
    
    database.ref().push({
    train = train,
    destination = destination,
    first = first,
    frequency = frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $('.form-control').val("");
  });

  dataRef.ref().on("child_added", function(childSnapshot) {

    var sv = snapshot.val();

    var train2 = sv.train;
    var destination2 = sv.destination;
    var firstTrain2 = sv.firstTrain;
    var frequency2 = sv.frequency;
  
  // First Time (pushed back 1 year to make sure it comes before current time)
    var firstConverted = moment(firstTrain2, "HH:mm").subtract(1, "years");
    console.log(firstConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency2;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency2 - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   

   
  
        // full list of items to the well
        $("#tbodyTrain").append("<tr><td>" + train2 + "</td><td>" + destination2 + "</td><td>" + frequency2 + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  
       
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

    });
  
     

    