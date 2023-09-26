<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $topic = $_POST["topic"];
    $profilePic = $_POST["profilePhoto"];
    $module = $_POST["module"];
    $description = $_POST["description"];
    $name = $_SESSION['name'];
    $surname = $_SESSION['surname'];
    $fullName = $name . ' ' . $surname;

    // Get the profilePhoto value from the session variable, or set it to an empty string if not set
    // $profilePic = isset($_SESSION['profilePhoto']) ? $_SESSION['profilePhoto'] : '';

    // if($profilePic == ''){
    //     echo '<script>alert("Not empty")</script>';
    // }

    $mysqli = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    // Use a prepared statement to safely insert data
    // Add downvotedUsers and upvotedUsers columns with empty JSON values
    $query = "INSERT INTO Questions (profilePic, name, moduleName, title, description, upvotes, downvotes, totalComments, downvotedUsers, upvotedUsers) 
              VALUES (?, ?, ?, ?, ?, 0, 0, 0, '[]', '[]')";

    $stmt = $mysqli->prepare($query);
    if ($stmt) {
        // Bind parameters by reference
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
