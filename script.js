function calculateEquation() {
    var canLength = parseFloat(document.getElementById("canLength").value) - 3;
    var canHeight = parseFloat(document.getElementById("canHeight").value) - 3;
    var strFaceLength = parseFloat(document.getElementById("strFaceLength").value);
    var strFaceHeight = parseFloat(document.getElementById("strFaceHeight").value);

    var centerLength = strFaceLength / 2;
    var centerHeight = strFaceHeight / 2;

    document.getElementById("centerLength").innerText = centerLength;
    document.getElementById("centerHeight").innerText = centerHeight;

    var resultLength = strFaceLength - canLength;
    var finalLength = resultLength / 2;

    var resultHeight = strFaceHeight - canHeight;
    var finalHeight = resultHeight / 2;

    document.getElementById("resultLength").innerText = "Stretch Face Length: " + strFaceLength + " - Can Length (after subtracting 3): " + canLength + " = " + resultLength + ", " + resultLength + " / 2 = " + finalLength + " (Depth Sides)";
    document.getElementById("resultHeight").innerText = "Stretch Face Height: " + strFaceHeight + " - Can Height (after subtracting 3): " + canHeight + " = " + resultHeight + ", " + resultHeight + " / 2 = " + finalHeight + " (Depth Sides)";
    document.getElementById("finalLength").innerText = "Final Length (Depth Sides): " + finalLength;
    document.getElementById("finalHeight").innerText = "Final Height (Depth Sides): " + finalHeight;
}

function clearData() {
    document.getElementById("canLength").value = "";
    document.getElementById("canHeight").value = "";
    document.getElementById("strFaceLength").value = "";
    document.getElementById("strFaceHeight").value = "";
    document.getElementById("centerLength").innerText = "";
    document.getElementById("centerHeight").innerText = "";
    document.getElementById("resultLength").innerText = "";
    document.getElementById("resultHeight").innerText = "";
    document.getElementById("finalLength").innerText = "";
    document.getElementById("finalHeight").innerText = "";
}
