<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./css/chat.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css'>

    <script src="https://kit.fontawesome.com/c25dad79f1.js" crossorigin="anonymous"></script>

    <title>Chat Page</title>

</head>


<body>
    <?php include 'navbar.php';?>
    <div id="chat-container">
        <div class="chat">
            <div class="chat-title">
                <h1 id="study-name">Study Group name</h1>
                <h2 id="module-name">Degree Programme</h2>
                <figure class="avatar">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>
            </div>
            <div class="messages">
                <div class="messages-content" id="message-hist">
                    <div class="message new">
                        <figure class="avatar">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg">
                        </figure>Hi there, I'm Fabio and you? <div class="timestamp">13:40</div>
                    </div>
                    <div class="message message-personal new">
                        <figure class="avatar-right">
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg">
                        </figure>Hi there, I'm Tumi! <div class="timestamp">13:45</div>
                    </div>  
                </div>
            </div>
        
            <div class="message-box">
                <textarea type="text" class="message-input" placeholder="Type message..."></textarea>
                <button type="submit" class="message-submit">Send</button>
            </div>
        </div>
        

        <!-- <div>
            <div id="right-sidebar">

            </div>
        </div> -->
        
    </div>
    <div class="overlay" id="overlay" >
        <div class="overlay-inner-wrapper" onclick="">
                <h3>Create New Study Group</h3>
                <form>
                    <div class="topic-wrapper">
                        <label for="topic">Study Group Name</label> <br>
                        <input type="text" id="userInputStudyGroup" name="topic">
                    </div>
                    <div>
                        <label for="topic">Topic</label> <br>
                        <input type="text" id="userInputModule" name="topic">
                    </div>

                    <div>
                        <button type="button" id="submitBtn" onclick="submitInput()">Create</button>
                        <button class="cancel-button" type="button" onclick="closePopup()" id="cancelBtn">Cancel</button>
                    </div>

                </form>

        </div>
    </div>

   <!-- partial -->
    <script src='//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js'></script>
    <script src="./javascript/chat.js"></script>
</body>
</html>
