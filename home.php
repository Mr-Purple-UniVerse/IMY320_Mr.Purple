<!DOCTYPE html>
<html lang="en">
    <head>
        <!--     Fonts     -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
            integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
            crossorigin="anonymous" referrerpolicy="no-referrer"/>

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Montserrat:wght@500&family=Poppins:wght@300&display=swap" rel="stylesheet">

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
        <link rel="stylesheet" href="CSS/home.css">
    </head>
    <body>
        <div id="mainHome">
            <div class="home-navigation">
                <button onclick="filterCards('All')">All</button>
                <button onclick="filterCards('COS 332')">COS 332</button>
                <button onclick="filterCards('COS 333')">COS 333</button>
                <button onclick="filterCards('COS 320')">COS 320</button>
                <button onclick="filterCards('COS 301')">COS 301</button>
            </div>

            <div class="card-container">
            </div>

            
            <button class="plus-button" onclick="activateOverlay()">
                <img src="assets/plus.png" alt="Plus" style="width:50px;">
            </button>
        </div>

        <div id="overlay">
            <div class="overlay-content">
                <input type="text" id="overlay-topic" placeholder="Topic">
                <textarea id="overlay-description" placeholder="Description"></textarea>
                <button id="overlay-submit">Submit</button>
                <button id="overlay-cancel" onclick="disableOverlay()">Cancel</button>
            </div>
        </div>

        <script src="home.js"></script>

    </body>
</html>
