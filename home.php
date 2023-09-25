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

        <script src="https://kit.fontawesome.com/c25dad79f1.js" crossorigin="anonymous"></script>

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
        <link rel="stylesheet" href="./css/home.css">
    </head>
    <body>

        <?php
            include 'navbar.php';
        ?>
        
        <div id="mainHome">
            <div class="home-navigation">
                <button onclick="filterCards('All')">All</button>
                <button onclick="filterCards('COS 332')">COS 332</button>
                <button onclick="filterCards('COS 333')">COS 333</button>
                <button onclick="filterCards('COS 320')">COS 320</button>
                <button onclick="filterCards('COS 301')">COS 301</button>
            </div>

            <br> <br> <br> <br>

            <div class="card-container">
            </div>

            
            <button class="plus-button" onclick="activateOverlay()">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <div id="overlay">
            <form action="/php/uploadQuestion.php" method="post"  onsubmit="return validateForm()">
                <h3>Ask your Question</h3>
                
                <div class="topic-and-module">
                    <div class="topic-wrapper">
                        <label for="topic">Topic</label> <br>
                        <input type="text" id="topic" name="topic">
                    </div>

                    <div class="module-wrapper">
                        <label for="module">Module</label> <br>
                        <select id="module" name="module">
                            <option value="COS 301">COS 301</option>
                            <option value="COS 332">COS 332</option>
                            <option value="IMY 320">IMY 320</option>
                        </select>
                    </div>
                </div>

                <div class="input-wrapper">
                    <label for="description">Description</label> <br>
                    <textarea id="description" name="description" rows="4"></textarea>
                </div>


                <div class="question-buttons">
                    <button type="submit" id="submitBtn">Submit</button>
                    <button class="cancel-button" type="button" onclick="deactivateOverlay()" id="cancelBtn">Cancel</button>
                </div>
            </form>
        </div>
        

        <script src="javascript/home.js"></script>

    </body>
</html>