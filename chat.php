<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="./css/chat.css">
    <title>Chat Page</title>

</head>


<body>
    <?php include 'navbar.php';?>
    <div id="chat-container">
        <div class="middle">
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
                <p class="module-name">COS 301</p>
            </div>
            <div id="message-hist">

                <div class="message">                 
                    <svg xmlns="http://www.w3.org/2000/svg" width="551" height="132" viewBox="0 0 551 132" fill="none">
                    <path d="M29.8661 126.032C34.1906 129.195 39.5151 131.114 45.2721 131.114H524.292C538.698 131.114 550.375 119.437 550.375 105.031V27.0822C550.375 12.6762 538.698 1 524.292 1H45.2721C30.8661 1 19.19 12.6762 19.19 27.0822V105.004C19.19 120.6 12.7032 131.087 1 131.087C1 131.087 16.5142 132.141 29.8931 126.005L29.8661 126.032Z" stroke="#8529A8" stroke-miterlimit="10"/>
                    </svg>
                    <div class="message-overlay">
                        <p>Does anyone know what’s going on with the credits for this module? Is it lower than last year??</p>
                    </div>
                </div>
                <div class="my-message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="491" height="139" viewBox="0 0 491 139" fill="none">
                    <path d="M462.332 103.659V35.2843C462.332 15.7957 444.527 0 422.558 0H39.7745C17.8058 0 0 15.7957 0 35.2843V103.622C0 123.111 17.8058 138.907 39.7745 138.907H422.517C431.337 138.907 439.416 136.347 446.01 132.033C466.413 140.333 490.071 138.907 490.071 138.907C472.224 138.907 462.332 124.683 462.332 103.622V103.659Z" fill="url(#paint0_linear_35_449)"/>
                    <defs>
                        <linearGradient id="paint0_linear_35_449" x1="0" y1="69.5082" x2="490.072" y2="69.5082" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#8529A8"/>
                        <stop offset="1" stop-color="#AB47AF"/>
                        </linearGradient>
                    </defs>
                    </svg>
                    <div class="my-message-overlay" >
                        <p>I remember the lecturer saying there is a lot less content this year so we yeah the credits is less unfortunately :’(</p>
                    </div>
                </div>
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
            <div class="right-sidebar">
                <div class="studygroup">
                    <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" fill="none">
                        <path d="M0 15C0 6.71573 6.71573 0 15 0H67C75.2843 0 82 6.71573 82 15V67C82 75.2843 75.2843 82 67 82H15C6.71573 82 0 75.2843 0 67V15Z" fill="url(#paint0_linear_35_441)"/>
                        <defs>
                            <linearGradient id="paint0_linear_35_441" x1="-21.5" y1="-19" x2="132.757" y2="-0.0122639" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#30F0FC"/>
                            <stop offset="1" stop-color="#2C00AB"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <div class="studygroup">

                </div>
                <div class="studygroup">

                </div>
            </div>
        </div>
    </div>

    
    <script src="./javascript/chat.js"></script>
</body>
</html>
