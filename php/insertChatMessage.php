<?php
// Establish a database connection

$conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request

$message = $_POST["message"];
$timestamp = $_POST["timestamp"];
$studygroup = $_POST["studygroup"];
$userid = $_POST["userid"];



// Insert data into the database
$sql = "INSERT INTO chat (message, timestamp, studyid, userid) 
        VALUES ('$message', '$timestamp', 
        (SELECT id FROM studygroups WHERE name = '$studygroup'), '$userid')";


if ($conn->query($sql) === TRUE) {
    $response = ["success" => true];
} else {
    $response = ["success" => false];
}
$response["sql"]  = $sql;

// Return a JSON response
header("Content-Type: application/json");
echo json_encode($response);

$conn->close();
?>
