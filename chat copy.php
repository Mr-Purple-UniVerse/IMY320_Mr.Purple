<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./css/chat.css">
    <script src="https://kit.fontawesome.com/c25dad79f1.js" crossorigin="anonymous"></script>

    <title>Chat Page</title>

</head>


<body>
    <?php include 'navbar.php';?>
    <div id="chat-container">
        <div id="middle">
            <div class="middle-top">
                <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" fill="none">
                    <path d="M0 15C0 6.71573 6.71573 0 15 0H67C75.2843 0 82 6.71573 82 15V67C82 75.2843 75.2843 82 67 82H15C6.71573 82 0 75.2843 0 67V15Z" fill="url(#paint0_linear_35_441)"/>
                    <defs>
                        <linearGradient id="paint0_linear_35_441" x1="-21.5" y1="-19" x2="132.757" y2="-0.0122639" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#30F0FC"/>
                        <stop offset="1" stop-color="#2C00AB"/>
                        </linearGradient>
                    </defs>
                </svg>
                <p id="study-name">Code Fusion</p>
                <p id="module-name" >COS 301</p>
            </div>
            <div id="message-hist">
           
            </div>
        
            <form id="middle-bottom">
                <input type="text" id="message-bar">
                
                <button type="submit" name="new-message" id="send-icon">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="send">
                        <path id="Vector" d="M27.5 2.5L13.75 16.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path id="Vector_2" d="M27.5 2.5L18.75 27.5L13.75 16.25L2.5 11.25L27.5 2.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>  
                </button>
            </form>
        </div>
        

        <div>
            <div id="right-sidebar">

            </div>
        </div>
        
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

   
    
    <script src="./javascript/chat.js"></script>
</body>
</html>
