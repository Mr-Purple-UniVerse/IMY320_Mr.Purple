<?php
// Establish a database connection
$servername = "34.27.203.247";
$username = "admin";
$password = "iloveapples";
$database = "universe";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request
$message = $_POST["message"];
$timestamp = $_POST["timestamp"];
$studygroup = $_POST["studygroup"];
$userid = $_POST["userid"];

// Use prepared statements to prevent SQL injection
$sql = "INSERT INTO chat (message, timestamp, studyid, userid) VALUES (?, ?, (SELECT id FROM studygroups WHERE name = ?), ?)";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("ssss", $message, $timestamp, $studygroup, $userid);
    if ($stmt->execute()) {
        $response = ["success" => true];
    } else {
        $response = ["success" => false, "error" => $conn->error];
    }
    $stmt->close();
} else {
    $response = ["success" => false, "error" => $conn->error];
}

// Return a JSON response
header("Content-Type: application/json");
echo json_encode($response);

$conn->close();
?>
