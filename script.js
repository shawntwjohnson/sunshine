// Declare the logsTableBody variable
var logsTableBody = document.querySelector("#logsTable tbody");

// Define other functions and logic below



function calculateEquation() {
    // Get values from the input fields
    var canLength = parseFloat(document.getElementById("canLength").value);
    var canHeight = parseFloat(document.getElementById("canHeight").value);
    var strFaceLength = parseFloat(document.getElementById("strFaceLength").value);
    var strFaceHeight = parseFloat(document.getElementById("strFaceHeight").value);

    // Perform calculations for Length
    var newLength = canLength - 3;
    var depthSidesCalculation = strFaceLength + " - " + newLength + " = " + (strFaceLength - newLength) + " / 2 = ";
    var depthSides = (strFaceLength - newLength) / 2;

    // Perform calculations for Height
    var newHeight = canHeight - 3;
    var depthTBCalculation = strFaceHeight + " - " + newHeight + " = " + (strFaceHeight - newHeight) + " / 2 = ";
    var depthTB = (strFaceHeight - newHeight) / 2;

    // Display the results in the results section
    document.getElementById("depthSidesCalculation").innerText = depthSidesCalculation;
    document.getElementById("depthSides").innerText = depthSides;

    document.getElementById("depthTBCalculation").innerText = depthTBCalculation;
    document.getElementById("depthTB").innerText = depthTB;

    // Display the final results in the #'s column
    document.getElementById("centerLength").innerText = "Sides\n" + depthSides.toFixed(2) + "''";
    document.getElementById("centerHeight").innerText = "T&B\n" + depthTB.toFixed(2) + "''";
}

function clearData() {
    // Clear the input fields and results
    document.getElementById("canLength").value = "";
    document.getElementById("canHeight").value = "";
    document.getElementById("strFaceLength").value = "";
    document.getElementById("strFaceHeight").value = "";
    document.getElementById("depthSidesCalculation").innerText = "";
    document.getElementById("depthSides").innerText = "";
    document.getElementById("depthTBCalculation").innerText = "";
    document.getElementById("depthTB").innerText = "";
    document.getElementById("centerLength").innerText = "";
    document.getElementById("centerHeight").innerText = "";
}


function logJob() {
    
    // Retrieve input values
    var jobNumber = document.getElementById("jobNumber").value;
    var totalLights = document.getElementById("totalLights").value;
    var lightType = document.getElementById("lightType").value;
    
    // Create new row
    var newRow = logsTableBody.insertRow();
  
    // Insert cells
    var cell1 = newRow.insertCell();
    var cell2 = newRow.insertCell();
    var cell3 = newRow.insertCell();
    var cell4 = newRow.insertCell();
  
    // Add content to cells
    cell1.textContent = jobNumber;
    cell2.textContent = totalLights;
    cell3.textContent = lightType;
    cell4.innerHTML = '<button onclick="deleteJob(this)">Delete</button>';
   
    // Clear input fields
    document.getElementById("jobNumber").value = "";
    document.getElementById("totalLights").value = "";
  
    // Scroll to bottom of the logs table
    logsTableBody.parentElement.scrollTop = logsTableBody.parentElement.scrollHeight;
  }
  
  function deleteJob(button) {
    // Get the parent row of the clicked button
    var row = button.parentElement.parentElement;
  
    // Remove the row from the logs table
    logsTableBody.removeChild(row);
  }
  
  function toggleDeleteMode() {
    // Toggle the delete mode by adding/removing a CSS class
    logsTableBody.classList.toggle("delete-mode");
  }
  
  function clearAllLogs() {
    // Remove all rows from the logs table
    while (logsTableBody.firstChild) {
      logsTableBody.removeChild(logsTableBody.firstChild);
    }
  }