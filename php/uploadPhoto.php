<?php

    session_start();

    $email = '';

    if(isset($_SESSION['email'])) {
        $email = $_SESSION['email'];
    }



    if ($_SERVER["REQUEST_METHOD"] == "POST" && $email != '') {
        $targetDir = "../uploads/";
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION));
        $uniqueIdentifier = uniqid();

        $targetFile = $targetDir . $uniqueIdentifier . "." . $imageFileType;

        if ($_FILES["fileToUpload"]["size"] > 5000000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }


        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
                $filename = basename($_FILES["fileToUpload"]["name"]);



                $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }

                $sql = "UPDATE Users SET profilePhoto='$targetFile' WHERE email='$email'";
                if ($conn->query($sql) === TRUE) {
                    echo 'success';
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }
    
                $conn->close();
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    }
?>
