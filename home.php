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
        <link rel="icon" href="./assets/favicon.ico">
    </head>
    <body>

        <?php
            include 'navbar.php';
        ?>
        
        <div id="mainHome">
            <div class="home-navigation">
                <?php
                if ($modules == '') {
                    echo '<button onclick="fetchDataFromServer(\'All\')">All</button>';
                    echo '<p class="noModulesMsg">No modules yet, add some!</p>';
                } else {
                    echo '<button onclick="fetchDataFromServer(\'All\')">All</button>';

                    $moduleCodes = explode(',', $modules);

                    foreach ($moduleCodes as $moduleCode) {
                        echo '<button onclick="fetchDataFromServer(\'' . trim($moduleCode) . '\')">'.trim($moduleCode) .'</button>';
                    }
                }
                ?>
            </div>
            <div class="cards-top-margin">
            </div>
            <div class="card-container">
            </div>

            
            <button class="plus-button" onclick="activateOverlay()">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <div id="overlay">
            <form action="/php/uploadQuestion.php" method="post"  onsubmit="return validateForm()">
            <input value="<?php echo $profilePhoto; ?>" type="hidden" name="profilePhoto"></input>
                <h3>Ask your Question</h3>
                
                <div class="topic-and-module">
                    <div class="topic-wrapper">
                        <label for="topic">Topic</label> <br>
                        <input type="text" id="topic" name="topic">
                    </div>

                    <div class="module-wrapper">
                        <label for="module">Module</label> <br>
                        <select id="module" name="module">
                            <?php 
                                if ($modules == '') {
                                    echo '<option value="All">All</option>';
                                } else {
                                    echo '<option value="All">All</option>';
                                    $moduleCodes = explode(',', $modules);

                                    foreach ($moduleCodes as $moduleCode) {
                                        echo '<option value="' . trim($moduleCode) . '">' . trim($moduleCode) . '</option>';
                                    }
                                }  
                            ?>
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