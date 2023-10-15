<?php
// Establish a database connection
$conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request

$group = $_POST["group"];


// SQL query
$sql = "SELECT `timestamp`, message, profilePhoto, userid FROM chat INNER JOIN Users ON Users.id = chat.userid WHERE studyid = '$group'";

$result = $conn->query($sql);

if ($result) {
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Return the data as JSON
    header('Content-Type: application/json');
    echo json_encode($data);

    // Close the database connection
    $conn->close();
} else {
    echo "Error: " . $mysqli->error;
}


?>
