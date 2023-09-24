<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <title>UniVerse | Register</title>

    <link rel="stylesheet" href="css/register.css">

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
        <h3>Create New Account</h3>
        <p>Already a member? <a href="index.php">Login</a></p>

        <form action="/php/registerForm.php" method="post">

            <div class="full-input">
                <div class="half-input">
                    <label for="name">First Name</label> <br>
                    <input type="text" id="name" name="name"> <br>
                </div>

                <div class="half-input">
                    <label for="surname">Last Name</label> <br>
                    <input type="text" id="surname" name="surname"> <br>
                </div>
            </div>

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

            <div class="input-wrapper">
                <label for="confirmPassword">Confirm Password</label> <br>
                <i class="fa-regular fa-eye" id="password-icon-confirm"></i>
                <input type="password" id="confirmPassword" name="confirmPassword"> <br>
            </div>

            <button type="submit">Create Account</button>
        </form>
    </div>
</body>
</html>

<script src="javascript/register.js"></script>