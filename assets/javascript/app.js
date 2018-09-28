//Steps to complete
    //1. Initialize Firebase
    //2. Create way to input additional train info and append it 
            //underneath the existing train data
    //3. Create way to calculate "minutes way" data for all trains
            //and add to the page


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjf5W87dY2SB30K-gSpZ0PSuzu7d3uSVQ",
    authDomain: "train-scheduler-b44bd.firebaseapp.com",
    databaseURL: "https://train-scheduler-b44bd.firebaseio.com/",
    projectId: "train-scheduler-b44bd",
    storageBucket: "",
    messagingSenderId: "1031590339358"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var trainTime;
  var frequency = 0;
  var minutesAway;
  var nextArrival;
  var trainCount = 0;

  //button for adding train data
  $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

    //grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = $("#first-train").val().trim();
    var frequency = $("#next-train").val().trim();

    //create local "temporary" object for holding train data
        var newTrain = {
            name: trainName,
            destination: destination,
            time: trainTime,
            frequency: frequency,
        };

    //upload employee data to the database
        database.ref().push({
            name: trainName,
            destination: destination,
            time: trainTime,
            frequency: frequency,
        });

    //log everything to the console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    //clear text-boxes
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#next-train").val("");

    //create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());


        //store everything into a variable
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;

        //train info
        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);

        //first time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        //current time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        //difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        //time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
    
        //minutes until train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        //next train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        //dynamically create a row for each new train
        var tBody = $("#trainTable");
        var tRow = $("<tr>");
        var trainTd = $("<td>").text(trainName);
        var destinationTd = $("<td>").text(destination);
        var trainTimeTd = $("<td>").text(firstTrain);
        var frequencyTd = $("<td>").text(frequency);
        var minutesAwayTd = $("<td>").text(nextTrain.format("LT"));

        tRow.attr("id", "train-" + trainCount);
        //append new train data to the table row
        tRow.append(trainTd, destinationTd, frequencyTd, trainTimeTd, minutesAwayTd);
        //append table row to the table body
        tBody.append(tRow);

        trainCount++;

    

        // function(errorObject) {
        //     console.log("The read failed:" + errorObject.code)
        
        }); 
    });

