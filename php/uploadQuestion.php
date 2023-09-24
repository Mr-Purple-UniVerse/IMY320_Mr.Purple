<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $topic = $_POST["topic"];
    $module = $_POST["module"];
    $description = $_POST["description"];
    $name = $_SESSION['name'];
    $surname = $_SESSION['surname'];
    $fullName = $name . ' ' . $surname;

    $mysqli = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    // Use a prepared statement to safely insert data
    $query = "INSERT INTO Questions (profilePic, name, moduleName, title, description, upvotes, downvotes, totalComments) VALUES (?, ?, ?, ?, ?, 0, 0, 0)";

    $stmt = $mysqli->prepare($query);
    if ($stmt) {
        // Bind parameters by reference
        $profilePic = ''; // Empty profilePic, you can modify it accordingly
        $stmt->bind_param("sssss", $profilePic, $fullName, $module, $topic, $description);

        // Execute the statement
        if ($stmt->execute()) {
            $stmt->close();
            $mysqli->close();
            header('Location: ../../home.php');
            exit();
        } else {
            echo "Error executing query: " . $stmt->error;
        }
    } else {
        echo "Error preparing statement: " . $mysqli->error;
    }
} else {
    echo "Form not submitted.";
}
?>
