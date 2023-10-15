<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
                crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Montserrat:wght@500&family=Poppins:wght@300&display=swap" rel="stylesheet">

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thread</title>
    <link rel="stylesheet" href="CSS/thread.css">
</head>
<body>
        <?php
            include 'navbar.php';
        ?>
    <div id="mainThread">
        <div id="thread-content">
            <!-- The thread content will be dynamically loaded here -->
        </div>

        <!-- <button class="back-button" onclick="loadHomePage()">
                    <img src="assets/back.png" alt="Plus" style="width:50px;">
        </button> -->
    </div>
    <script src="javascript/thread.js"></script>
</body>
</html>