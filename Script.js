// Array to store the list of participants
let participants = [];

// Array to store the list of past winners
let pastWinners = [];

// Function to add a row to the table
function addRow() {
     // Get the values entered in the form
     let name = document.querySelector("#name").value;
     let amount = document.querySelector("#amount").value;
     let phone = document.querySelector("#phone").value;

     // Check if any of the fields are empty
     if (name === "" || amount === "" || phone === "") {
          document.querySelector("#error").innerHTML = "Please fill in all fields";
          return;
     }

     // Check if this participant has already been added
     for (let participant of participants) {
          if (participant.name === name && participant.phone === phone) {
               document.querySelector("#error").innerHTML = "This participant has already been added";
               return;
          }
     }

     // Add the participant to the array of participants
     participants.push({ name: name, amount: amount, phone: phone });

     // Get the table element
     let table = document.querySelector("#myTable");

     // Create a new row and cells
     let newRow = table.insertRow(-1);
     let cell1 = newRow.insertCell(0);
     let cell2 = newRow.insertCell(1);
     let cell3 = newRow.insertCell(2);

     // Add the participant's information to the cells
     cell1.innerHTML = name;
     cell2.innerHTML = amount;
     cell3.innerHTML = phone;

     // Reset the form
     document.querySelector("#name").value = "";
     document.querySelector("#amount").value = "500";
     document.querySelector("#phone").value = "";

     // Clear any error messages
     document.querySelector("#error").innerHTML = "";
}

// Function to pick a winner
function pickWinner() {
     // Check if there are at least two participants
     if (participants.length < 2) {
          document.querySelector("#winner").innerHTML = "There must be at least two participants to pick a winner";
          return;
     }

     // Filter out the past winners from the list of participants
     let eligibleParticipants = participants.filter(participant => !pastWinners.includes(participant));

     // Check if there are any eligible participants left
     if (eligibleParticipants.length === 0) {
          document.querySelector("#winner").innerHTML = "All participants have already won";
          return;
     }

     // Pick a random winner from the array of eligible participants
     let winnerIndex = Math.floor(Math.random() * eligibleParticipants.length);
     let winner = eligibleParticipants[winnerIndex];

     // Add the winner to the list of past winners
     pastWinners.push(winner);

     // Display the winner's information on the page
     document.querySelector("#winner").innerHTML = `Winner: ${winner.name}, Amount: ${winner.amount}, Phone: ${winner.phone}`;
}