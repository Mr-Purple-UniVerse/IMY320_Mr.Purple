<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SESSION['email'])) {
    $targetDir = "../uploads/";
    $uploadOk = 1;
    $resourceFileType = strtolower(pathinfo($_FILES["resourceFile"]["name"], PATHINFO_EXTENSION));
    $uniqueIdentifier = uniqid();

    $targetFile = $targetDir . $uniqueIdentifier . "." . $resourceFileType;

    if ($_FILES["resourceFile"]["size"] > 5000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    if($resourceFileType != "pdf" && $resourceFileType != "doc" && $resourceFileType != "docx") {
        echo "Sorry, only PDF, DOC & DOCX files are allowed.";
        $uploadOk = 0;
    }

    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    } else {
        if (move_uploaded_file($_FILES["resourceFile"]["tmp_name"], $targetFile)) {
            $filename = basename($_FILES["resourceFile"]["name"]);

            $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $title = $_POST["resourceTitle"];
            $moduleCode = $_POST["moduleCode"];
            $description = $_POST["description"];
            $email = $_SESSION['email'];

            $sql = "INSERT INTO Resources (title, module, description, file, user) VALUES ('$title', '$moduleCode', '$description', '$targetFile', '$email')";
            if ($conn->query($sql) === TRUE) {
                echo "success";
            } else {
                echo "Error updating record: " . $conn->error;
            }

            $conn->close();
        } else {
            echo "Sorry, there was an error uploading your file.";
        }

    // // Handle file upload
    // $targetDir = "uploads/"; // Create this directory if it doesn't exist
    // $targetFile = $targetDir . basename($_FILES["resourceFile"]["name"]);
    }
}
?>
