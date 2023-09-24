<?php
$mysqli = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$query = "SELECT * FROM Questions";
$result = $mysqli->query($query);

if ($result) {
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Return the data as JSON
    header('Content-Type: application/json');
    echo json_encode($data);

    // Close the database connection
    $mysqli->close();
} else {
    echo "Error: " . $mysqli->error;
}
?>
