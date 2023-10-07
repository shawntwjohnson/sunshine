// Declare the logsTableBody variable
var logsTableBody = document.querySelector("#logsTable tbody");

// Function to fetch and display job logs
function fetchAndDisplayJobs() {
    fetch('https://sunshine-way-66d2769a4468.herokuapp.com/jobs/get')
    .then(response => response.json())
    .then(jobs => {
        jobs.forEach(job => {
            var newRow = logsTableBody.insertRow();

            var cell1 = newRow.insertCell();
            var cell2 = newRow.insertCell();
            var cell3 = newRow.insertCell();
            var cell4 = newRow.insertCell();

            cell1.textContent = job.jobNumber;
            cell2.textContent = job.totalLights;
            cell3.textContent = job.lightType;
            cell4.innerHTML = '<button onclick="deleteJob(this)">Delete</button>';
        });
    })
    .catch(error => {
        console.error('Error fetching jobs:', error);
    });
}

// Call the function to fetch and display job logs when the page loads
window.onload = fetchAndDisplayJobs;

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
    var jobNumber = document.getElementById("jobNumber").value;
    var totalLights = document.getElementById("totalLights").value;
    var lightType = document.getElementById("lightType").value;

    const jobData = {
        jobNumber: jobNumber,
        totalLights: totalLights,
        lightType: lightType
    };

    fetch('https://sunshine-way-66d2769a4468.herokuapp.com/jobs/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); 
            
            var newRow = logsTableBody.insertRow();
            var cell1 = newRow.insertCell();
            var cell2 = newRow.insertCell();
            var cell3 = newRow.insertCell();
            var cell4 = newRow.insertCell();

            cell1.textContent = jobNumber;
            cell2.textContent = totalLights;
            cell3.textContent = lightType;
            cell4.innerHTML = '<button onclick="deleteJob(this)">Delete</button>';

            document.getElementById("jobNumber").value = "";
            document.getElementById("totalLights").value = "";

            logsTableBody.parentElement.scrollTop = logsTableBody.parentElement.scrollHeight;
        } else if (data.error) {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error logging job:', error);
        alert('Error logging job. Please try again.');
    });
}

function deleteJob(buttonElement, jobId) {
    fetch(`https://sunshine-way-66d2769a4468.herokuapp.com/jobs/delete/${jobId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            // Remove the job row from the table
            buttonElement.parentElement.parentElement.remove();
        } else if (data.error) {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error deleting job:', error);
        alert('Error deleting job. Please try again.');
    });
}

