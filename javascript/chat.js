
document.addEventListener("DOMContentLoaded", function() {
    const messageBar = document.getElementById("message-bar");
    const form = document.getElementById("middle-bottom");
    const submitButton = document.getElementById("send-icon");
  
    
    form.addEventListener("submit", function(event) {
        const messageToSend = messageBar.value;
        const messageHist = document.getElementById("message-hist");
        myMessageHTML = `
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
                <p>${messageToSend}</p>
            </div>
        </div>`
        messageHist.innerHTML += myMessageHTML;



        event.preventDefault();
        const studyGroup = document.getElementById('study-name').textContent
        const formData = new FormData();
        formData.append("message", messageToSend);
        formData.append("timestamp", Math.floor(Date.now() / 1000));
        formData.append("studygroup", studyGroup);
        formData.append("userid", localStorage.getItem('userid'));

        console.log(messageToSend);
    //   Make an AJAX POST request
        fetch("../php/insertChatMessage.php", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Data inserted successfully!");
                form.reset(); // Reset the form
            } else {
                console.log("Data insertion failed!");
                console.log(data.sql)
            }
        })
        .catch(error => {
            console.log("Error:", error);
        });
    });
  });
  