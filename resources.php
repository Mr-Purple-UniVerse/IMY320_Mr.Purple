<?php
    session_start();

    $email = '';
    $profilePhoto = '';
    $modules = '';
    $aboutMe = '';
    $degree = '';

    if(isset($_SESSION['name']) && isset($_SESSION['surname']) && isset($_SESSION['email'])) {
        $email = $_SESSION['email'];

        $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM Resources";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $resourcesArray[] = $row;
            }
        }

        // $conn->close();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <title>UniVerse | Resources</title>

    <link rel="stylesheet" href="css/resources.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script src="https://kit.fontawesome.com/c25dad79f1.js" crossorigin="anonymous"></script>

    <!--     Fonts     -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400">
</head>

<body>
    <?php
        include 'navbar.php';
    ?>

    <div class="resources-container">

        <div class="search-bar">
            <input type="text" name="searchResource" id="searchResource">
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>

        <div class="resource-cards-wrapper">

            <?php

                foreach($resourcesArray as $resource) {
                    $userEmail = $resource["user"];
                    $userQuery = "SELECT name, surname, profilePhoto, degree FROM Users WHERE email='$userEmail'";
                    $userResult = $conn->query($userQuery);

                    $fileLink = $resource["file"];
                    $googleViewerUrl = "https://docs.google.com/viewer?url=" . urlencode($fileLink) . "&embedded=true";

                    if ($userResult->num_rows > 0) {
                        $userRow = $userResult->fetch_assoc();
                        $userName = $userRow["name"];
                        $userSurname = $userRow["surname"];
                        $userProfilePhoto = $userRow["profilePhoto"];
                        $userDegree = $userRow["degree"];



                        echo '<div class="resource-card">';
                        echo '<h3>' . $resource["title"] . '</h3>';
                        echo '<div class="resource-main-info">';
                            echo '<div class="resource-img">';
                                echo '<iframe src="https://docs.google.com/viewer?url=http://infolab.stanford.edu/pub/papers/google.pdf&embedded=true&a=bi&pagenumber=1&scale=2" style="width:600px; height:500px;" frameborder="0"></iframe>';
                            echo '</div>';                        
                        echo '<div class="resource-text">';
                            echo '<p class="resource-title">' . $resource["description"] . '</p> <br>';
                            echo '<p>2 Pages</p>';
                            echo '<p>' . $resource["module"] . '</p>';
                        echo '</div></div>';
                        echo '<div class="divider"></div>';
                        echo '<div class="user-info">';
                            echo '<div class="user-img">';
                                echo '<img src="' . $userProfilePhoto . '" alt="user-img">';
                            echo '</div>';
                            echo '<p class="userName">' . $userName . ' ' . $userSurname . ' (' . $userDegree . ')</p>';
                        echo '</div></div>';
                    }
                }
            ?>


    <button class="plus-button" onclick="activateOverlay()">
        <i class="fa-solid fa-plus"></i>
    </button>

    <div class="add-resource-overlay" id="resourceOverlayOuterWrapper" onclick="deactivateOverlay()">
        <div class="overlay-inner-wrapper">
            <h2>Add a resource</h2>

            <div class="half-input">
                <div class="single-input">
                    <label for="resourceTitle">Title</label>
                    <input type="text" placeholder="Assignment 1" id="resourceTitle">
                </div>

                <div class="select-input">
                    <label for="moduleCode">Module</label>
                    <select name="moduleCode" id="moduleCode">
                        <option value="COS 300">COS 300</option>
                        <option value="COS 200">COS 200</option>
                        <option value="COS 100">COS 100</option>
                    </select>
                </div>
            </div>

            <div class="full-input">
                <label for="description">Description</label>
                <textarea name="description" id="description" placeholder="Resource Description"></textarea>
            </div>

            <div class="full-input">
                <label for="resourceFile">File</label>
                <input type="file" name="resourceFile" id="resourceFile" accept=".pdf, .doc, .docx" multiple="false">
                <span class="msg">Accepted formats: PDF, DOC, DOCX (May only upload a single file)</span>
            </div>

            <button id="submitResourceBtn">Submit</button>
            <button id="submitResourceBtn" onclick="deactivateOverlay()">Cancel</button>
        </div>
    </div>
</body>
</html>

<script src="javascript/resources.js"></script>