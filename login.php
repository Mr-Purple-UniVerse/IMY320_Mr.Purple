<?php
    $conn = new mysqli("34.27.203.247", "admin", "iloveapples", "universe");
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM Users;";
    $result = $conn->query($sql);

    // if ($result->num_rows > 0) {
    //     while($row = $result->fetch_assoc()) {
    //         echo "ID: " . $row["id"]. " - Name: " . $row["name"]. " - Email: " . $row["email"]. "<br>";
    //     }
    // } else {
    //     echo "0 results";
    // }

    $conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <title>UniVerse | Login</title>

    <link rel="stylesheet" href="css/login.css">

    <script src="https://kit.fontawesome.com/c25dad79f1.js" crossorigin="anonymous"></script>

    <!--     Fonts     -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400">
</head>

<body>
    <div class="background"></div>
    <div class="header">
        <img src="assets/logo.png" alt="logo">
        <h1>UniVerse</h1>
    </div>

    <div class="login-wrapper">
        <h3>Login</h3>
        <p>Don't have an account? <a href="register.php">Register</a></p>

        <form action="/php//loginForm.php" method="post">
            <div class="input-wrapper">
                <label for="email">Email</label> <br>
                <i class="fa-regular fa-envelope"></i>
                <input type="text" id="email" name="email"> <br>
            </div>

            <div class="input-wrapper">
                <label for="password">Password</label> <br>
                <i class="fa-regular fa-eye" id="password-icon"></i>
                <input type="password" id="password" name="password"> <br>
            </div>

            <button type="submit">Login</button>

            <?php
                if(isset($_GET['error']) && $_GET['error'] == 'invalid') {
                    echo "<p style='color: red;'>Invalid email or password. Please try again.</p>";
                }
            ?>

        </form>
    </div>
</body>
</html>

<script src="javascript/login.js"></script>