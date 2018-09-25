//Steps to complete
    //1. Initialize Firebase
    //2. Create way to input additional train info and append it 
            //underneath the existing train data
    //3. Create way to calculate "minutes way" data for all trains
            //and add to the page


// Initialize Firebase
  var config = {
    //apiKey: "AIzaSyCjf5W87dY2SB30K-gSpZ0PSuzu7d3uSVQ",
    authDomain: "train-scheduler-b44bd.firebaseapp.com",
    databaseURL: "https://train-scheduler-b44bd.firebaseio.com",
    projectId: "train-scheduler-b44bd",
    storageBucket: "",
    messagingSenderId: "1031590339358"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //button for adding train data
  $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

  //grabs user input
    



  })




