<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['email'])) {
    $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $degree = $_POST["degree"];
    $email = $_SESSION['email'];

    $updateSql = "UPDATE Users SET degree='$degree' WHERE email='$email'";
    if ($conn->query($updateSql) === TRUE) {
        echo "success";
    } else {
        echo "Error updating record: " . $conn->error;
    }

    $conn->close();
}
?>
