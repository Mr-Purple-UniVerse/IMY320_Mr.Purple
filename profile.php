<?php
    session_start();

    $email = '';
    $profilePhoto = '';
    $modules = '';
    $aboutMe = '';
    $degree = '';

    if(isset($_SESSION['name']) && isset($_SESSION['surname']) && isset($_SESSION['email'])) {
        $name = $_SESSION['name'];
        $surname = $_SESSION['surname'];
        $email = $_SESSION['email'];

        $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT profilePhoto, modules, about, degree FROM Users WHERE email='$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $profilePhoto = $row['profilePhoto'];
            $modules = $row['modules'];
            $aboutMe = $row['about'];
            $degree = $row['degree'];
        }

        $conn->close();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <title>UniVerse | Profile</title>

    <link rel="stylesheet" href="css/profile.css">

    <link rel="icon" href="./assets/favicon.ico">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script src="https://kit.fontawesome.com/c25dad79f1.js" crossorigin="anonymous"></script>

    <!--     Fonts     -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400">
</head>

<body>

<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>
<div class="circle"></div>

    <?php
        include 'navbar.php';
    ?>

    <div class="profile-container">
        <div class="user-header">
            <div class="user-img" id="userImg">
                <?php if($profilePhoto != ''): ?>
                    <img src="<?php echo $profilePhoto; ?>" alt="user-img">
                <?php else: ?>
                    <img src="/assets/background.png" alt="user-img">
                <?php endif; ?>

                <div class="hover-background"><i class="fa-solid fa-pencil"></i></div>
            </div>

            <div class="user-info">
                <h1>
                    <?php echo $name . ' ' . $surname; ?>
                </h1>

                <div class="user-degree">
                    <i class="fa-solid fa-pencil"></i><p contenteditable="true" id="degree"><?php if($degree != '') {echo $degree;} else {echo 'Click here to add your degree!';}?></p>
                </div>

                <button class="update-degree-btn" onclick="updateDegree()">Update Degree</button>
            </div>
        </div>

        <h2>About Me</h2>

        <textarea name="about-me" id="aboutme" cols="30" rows="10" class="about-me" placeholder="Tell us more about yourself!"><?php if($aboutMe != '') {echo $aboutMe;}?></textarea>

        <button class="update-profile-btn" onclick="updateProfile()">Update About</button>

        <h2>Registered Modules</h2>
        <div class="registered-modules-wrapper" id="registeredModules">
            <?php
                if($modules == '') {
                    echo '<p class="noModulesMsg">No modules yet, add some!</p>';
                } else {
                    $moduleCodes = explode(',', $modules);

                    foreach ($moduleCodes as $moduleCode) {
                        echo '<div class="module">' . 
                                trim($moduleCode) .
                                '<div class="remove-module" onclick="removeModule(\'' . trim($moduleCode) . '\')">
                                    <i class="fa-solid fa-xmark"></i>
                                </div>' .
                            '</div>';
                    }
                }
            ?>
            <div class="add-btn">
                <i class="fa-solid fa-plus"></i>
            </div>
        </div>
    </div>

    <div class="add-overlay" id="add-overlay">
        <div class="overlay-inner-wrapper">
            <h2>Add a module from the list below</h2>
            <select name="moduleSelected" id="modulesSelected">
                <option value="COS 301">COS 301</option>
                <option value="COS 314">COS 314</option>
                <option value="COS 326">COS 326</option>
                <option value="COS 330">COS 330</option>
                <option value="COS 332">COS 332</option>
                <option value="COS 333">COS 333</option>
                <option value="COS 341">COS 341</option>
                <option value="COS 344">COS 344</option>
                <option value="IMY 300">IMY 300</option>
                <option value="IMY 310">IMY 310</option>
                <option value="IMY 320">IMY 320</option>
            </select>
            <div class="buttons">
                <button class="addModuleBtn">Add</button>
                <button id="cancelModuleBtn" onclick="deactivateOverlay()">Cancel</button>
            </div>
        </div>
    </div>

    <form id="uploadForm" action="/php/uploadPhoto.php" method="post" enctype="multipart/form-data" style="display: none;">
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Upload Image" name="submit" id="submitBtn">
    </form>

    <div class="message">
        Profile picture updated!
    </div>

    <div class="moduleMessage">
        Module Added!
    </div>

    <div class="aboutMessage">
        About me updated!
    </div>

    <div class="degreeMessage">
        Degree updated!
    </div>

    <div class="removeMessage">
        Module removed!
    </div>

    <div class="failedMessage">
        Module already added!
    </div>

</body>
</html>

<script src="javascript/profile.js"></script>
<script src="javascript/index.js"></script>
