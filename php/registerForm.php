<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = $_POST["name"];
    $surname = $_POST["surname"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "INSERT INTO Users (name, surname, email, password) VALUES ('$name', '$surname', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        $conn->close();
        header('Location: index.html'); // Redirect to index page
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
