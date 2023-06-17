# Equb
Equb System With HTML5, CSS, JavaScript


<!DOCTYPE html>
<!-- Specifies that this is an HTML5 document -->
<html lang="en">
<!-- The root element of the page, specifies the language of the page -->

<head>
     <!-- Contains metadata and other information about the page -->
     <meta charset="UTF-8">
     <!-- Specifies the character encoding of the page -->
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <!-- Specifies the viewport settings for responsive design -->
     <title>My Equb</title>
     <!-- Specifies the title of the page -->
     <link rel="stylesheet" href="Style.css">
     <!-- Links to an external CSS file to style the page -->
</head>

<body>
     <!-- Contains the main content of the page -->
     <div class="container whole-container">
          <!-- A container element for the whole page -->
          <div class="container header-main">
               <!-- A container element for the header -->
               <header>
                    <!-- The header element -->
                    <h1>My Equb</h1>
                    <!-- The main heading of the page -->
               </header>
          </div>
          <div class="row p-4 container">
               <!-- A container element for a row of content -->
               <div class="col">
                    <!-- A container element for a column of content -->
                    <div class="container form-container">
                         <!-- A container element for the form -->
                         <div class="form">
                              <!-- The form element -->
                              <label for="name">Name: </label>
                              <!-- A label for the name input field -->
                              <input type="text" name="name" id="name" required>
                              <!-- An input field for the participant's name, required to submit the form -->
                              <label for="amount">Amount: </label>
                              <!-- A label for the amount select field -->
                              <select id="amount">
                                   <!-- A select field for the participant's amount of money -->
                                   <option value="500">500</option>
                                   <!-- An option for 500 -->
                                   <option value="1000">1000</option>
                                   <!-- An option for 1000 -->
                                   <option value="5000">5000</option>
                                   <!-- An option for 5000 -->
                                   <option value="10000">10,000</option>
                                   <!-- An option for 10000 -->
                              </select>
                              <label for="phone">Phone Number: </label>
                              <!-- A label for the phone input field -->
                              <input type="tel" name="phone" id="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                   required><br><br>
                              <!-- An input field for the participant's phone number, required to submit the form, uses a pattern to ensure that the phone number is entered in a specific format -->
                              <button onclick="addRow()">Register</button>
                              <!-- A button to submit the form and add the participant to the list, calls the addRow function when clicked -->
                         </div>

                         <h1>Rules</h1>
                         <!-- A heading for the rules section -->
                         <p>
                              <!-- A paragraph element to contain the rules text -->
                         <ol>
                              <!-- An ordered list to display the rules -->
                              <li>Fill the input boxes with the right information.</li>
                              <!-- Rule 1: Fill in all fields with correct information.-->
                              <li>Fill in your name and Father's name.</li>
                              <!-- Rule 2: Fill in your name and Father's name.-->
                              <li>Choose from the option the amount you are going to place.</li>
                              <!-- Rule 3: Choose an amount from the select field.-->
                              <li>Add your phone number on the phone field.</li>
                              <!-- Rule 4: Enter your phone number in a specific format.-->
                              <li>Check what you filled in.</li>
                              <!-- Rule 5: Check that all information is correct.-->
                              <li>Then Click Register</li>
                              <!-- Rule 6: Click Register to submit your information.-->
                         </ol>
                         </p>

                         <!-- Display error messages -->
                         <p id="error"></p>

                    </div>
               </div>

               <!-- Display the list of participants in a table -->
               <div class="col">
                    <!-- A container element for a column of content-->
                    <div class="container table-container">
                         <!-- A container element for the table-->
                         <table id="myTable">
                              <!-- The table element -->
                              <thead>
                                   <!-- The table head element -->
                                   <td>Name</td>
                                   <!-- A table cell for the Name column header -->
                                   <td>Amount</td>
                                   <!-- A table cell for the Amount column header -->
                                   <td>Phone</td>
                                   <!-- A table cell for the Phone column header -->
                              </thead>
                              <!-- Table body will be populated with JavaScript -->
                         </table>

                         <!-- Button to pick a winner -->
                         <button onclick="pickWinner()">Pick Winner</button>

                         <!-- Display the winner -->
                         <p id="winner"></p>

                    </div>

               </div>

          </div>

     </div>

     <!-- JavaScript code to handle form submission and picking a winner -->
     <script>

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
               // Check if there are any participants
               if (participants.length === 0) {
                    document.querySelector("#winner").innerHTML = "No participants yet";
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

     </script>

</body>

</html>
