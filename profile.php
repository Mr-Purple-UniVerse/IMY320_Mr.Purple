<?php
    session_start();

    $email = '';
    $profilePhoto = '';

    if(isset($_SESSION['name']) && isset($_SESSION['surname']) && isset($_SESSION['email'])) {
        $name = $_SESSION['name'];
        $surname = $_SESSION['surname'];
        $email = $_SESSION['email'];

        $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT profilePhoto FROM Users WHERE email='$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $profilePhoto = $row['profilePhoto'];
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
                <p>BSc Computer Science</p>
            </div>
        </div>

        <h2>About Me</h2>

        <textarea name="about-me" id="aboutme" cols="30" rows="10" class="about-me" placeholder="Tell us more about yourself!"></textarea>

        <!-- <div class="about-me" id="aboutMe" contenteditable="true">
            <span id="placeholder">Tell us more about yourself!</span>
        </div> -->

        <h2>Registered Modules</h2>
        <div class="registered-modules-wrapper">
            <div class="module">COS 301</div>
            <div class="module">COS 332</div>
            <div class="add-btn">
                <i class="fa-solid fa-plus"></i>
            </div>
        </div>

        <button class="update-profile-btn">Update Profile</button>
    </div>

    <div class="add-overlay" id="add-overlay">
        <div class="overlay-inner-wrapper">
            
        </div>
    </div>

    <form id="uploadForm" action="/php/uploadPhoto.php" method="post" enctype="multipart/form-data" style="display: none;">
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Upload Image" name="submit" id="submitBtn">
    </form>

    <div class="message">
        Profile picture updated!
    </div>


</body>
</html>

<script src="javascript/profile.js"></script>