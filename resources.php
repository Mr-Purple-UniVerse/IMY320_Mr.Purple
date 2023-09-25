<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <title>UniVerse | Login</title>

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
            <div class="resource-card">
                <h3>COS 330 Assignment</h3>
                <div class="resource-main-info">
                    <div class="resource-img"></div>
                    <div class="resource-text">
                        <p class="resource-title">This was the past paper which consisted of bla bla bla</p> <br>
                        <p>2 Pages</p>
                        <p>COS 330</p>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="user-info">
                    <div class="user-img">
                        <img src="/uploads/650f2ce297d3b.jpg" alt="user-img">
                    </div>
                    <p>John Cena (BIS Multimedia)</p>
                </div>
            </div>

            <div class="resource-card">
                <h3>COS 330 Assignment</h3>
                <div class="resource-main-info">
                    <div class="resource-img"></div>
                    <div class="resource-text">
                        <p>This was the past paper which consisted of bla bla bla</p> <br>
                        <p>2 Pages</p>
                        <p>COS 330</p>
                    </div>
                </div>
                <div class="user-info">
                    <div class="user-img">
                        <img src="/uploads/650f2ce297d3b.jpg" alt="user-img">
                    </div>
                    <p>John Cena (BIS Multimedia)</p>
                </div>
            </div>
            <div class="resource-card">
                <h3>COS 330 Assignment</h3>
                <div class="resource-main-info">
                    <div class="resource-img"></div>
                    <div class="resource-text">
                        <p>This was the past paper which consisted of bla bla bla</p> <br>
                        <p>2 Pages</p>
                        <p>COS 330</p>
                    </div>
                </div>
                <div class="user-info">
                    <div class="user-img">
                        <img src="/uploads/650f2ce297d3b.jpg" alt="user-img">
                    </div>
                    <p>John Cena (BIS Multimedia)</p>
                </div>
            </div>
        </div>
    
    </div>



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