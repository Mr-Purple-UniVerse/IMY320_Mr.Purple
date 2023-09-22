<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email = $_POST["email"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM Users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User is authenticated
        // Redirect or perform other actions here
        header('Location: ../../home.php'); // Redirect to index page
    } else {
        // Invalid email or password
        header('Location: ../../login.php?error=invalid');
        exit();
    }

    $conn->close();
}
?>
