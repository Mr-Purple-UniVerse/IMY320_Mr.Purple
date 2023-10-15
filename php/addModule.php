<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['email'])) {
    $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $moduleCode = $_POST["moduleCode"];
    $email = $_SESSION['email'];

    $sql = "SELECT modules FROM Users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $currentModules = $row['modules'];

        $moduleArray = explode(',', $currentModules);
        if (in_array($moduleCode, $moduleArray)) {
            echo "Module already added";
            exit;
        }

        $newModules = $currentModules ? $currentModules . ',' . $moduleCode : $moduleCode;

        $updateSql = "UPDATE Users SET modules='$newModules' WHERE email='$email'";

        if ($conn->query($updateSql) === TRUE) {
            echo $newModules;
        } else {
            echo "Error updating record: " . $conn->error;
        }
    } else {
        echo "User not found";
    }

    $conn->close();
}
?>
