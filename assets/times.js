const firebaseConfig = {
    apiKey: "AIzaSyAZO1EPnDFJgKKYrAdoCoUat8S-gJCPHv4",
    authDomain: "train-schedule-14389.firebaseapp.com",
    databaseURL: "https://train-schedule-14389.firebaseio.com/",
    projectId: "train-schedule-14389",
    storageBucket: "train-schedule-14389.appspot.com",
    messagingSenderId: "588860871071",
    appId: "1:588860871071:web:4e7aac130b29bfaec92daa"
  };
  
  firebaseConfig.initalizeApp(config);

  var database = firebase.database();

  var train = "";
  var destination = "";
  var first = "";
  var frequency = "";
  
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    train = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    first = $("#first-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    
    
    DataTransfer.ref().push( {
    train = train,
    destination = destination,
    first = first,
    frequency = frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
  
  // First Time (pushed back 1 year to make sure it comes before current time)
    var firstConverted = moment(first, "HH:mm").subtract(1, "years");
    console.log(firstConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    dataRef.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());
        console.log(childSnapshot.val().train);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().nextTrain);
        console.log(childSnapshot.val().tMinutesTillTrain);
  
        // full list of items to the well
        $("#tbodyTrain").append("<div class='well'><span class='train'> " +
          childSnapshot.val().train +
          " </span><span class='destination'> " + childSnapshot.val().destination +
          " </span><span class='first'> " + childSnapshot.val().nextTrain +
          " </span><span class='frequency'> " + childSnapshot.val().tMinutesTillTrain +
          " </span></div>");
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  
      dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        $("#train-display").text(snapshot.val().train);
        $("#destination-display").text(snapshot.val().destination);
        $("#frequency-display").text(snapshot.val().frequency);
        $("#next-display").text(snapshot.val().next);
        $("#mins-display").text(snapshot).val.tMinutesTillTrain;
      });

    