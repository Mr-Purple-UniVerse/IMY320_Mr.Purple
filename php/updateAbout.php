<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['email'])) {
    $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $aboutMe = $_POST["aboutMe"];
    $email = $_SESSION['email'];

    $sql = "UPDATE Users SET about='$aboutMe' WHERE email='$email'";
    if ($conn->query($sql) === TRUE) {
        echo "success";
    } else {
        echo "Error updating record: " . $conn->error;
    }

    $conn->close();
}
?>
