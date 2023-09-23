<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <title>UniVerse | Profile</title>

    <link rel="stylesheet" href="css/profile.css">

    <script src="https://kit.fontawesome.com/c25dad79f1.js" crossorigin="anonymous"></script>

    <!--     Fonts     -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400">
</head>

<body>

    <div class="profile-container">
        <div class="user-header">
            <div class="user-img">
                <img src="/assets/background.png" alt="user-img">
            </div>

            <div class="user-info">
                <h1>John Cena</h1>
                <p>BSc Computer Science</p>
            </div>
        </div>

        <h2>About Me</h2>
        <div class="about-me" contenteditable="true">I am awesome!</div>

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


</body>
</html>

<script src="javascript/profile.js"></script>