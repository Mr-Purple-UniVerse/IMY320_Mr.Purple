<?php
// Establish a database connection
$conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_POST["id"];

// SQL query
$sql = "SELECT * FROM studygroups where id='$id';";

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
