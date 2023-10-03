// show_messages_of(1);
populateStudyGroups().then(() => {
    document.getElementById("right-sidebar").querySelector(".studygroup").click();
});


function show_messages_of(studyGroupId)
{
    const messageHist = document.getElementById("message-hist");
    messageHist.innerHTML = "";
    const formData = new FormData();
    formData.append("group", studyGroupId);
    
    fetch("../php/getChat.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        data.forEach((message) => {
            if(message.userid = localStorage.getItem('userid')){
               myMessageHTML = `
               <div class="my-message-group">
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
                       <p>${message.message}</p>
                   </div>
               </div>
               <div class="user-img">
                   <img src="/assets/background.png" alt="">
               </div>
           </div>`
                messageHist.innerHTML += myMessageHTML;
            }
            else{
                otherMessageHTML = `<div class="other-message-group">
                    <div class="user-img">
                        <img src="/assets/background.png" alt="">
                    </div>
                    <div class="message">                 
                        <svg xmlns="http://www.w3.org/2000/svg" width="551" height="132" viewBox="0 0 551 132" fill="none">
                        <path d="M29.8661 126.032C34.1906 129.195 39.5151 131.114 45.2721 131.114H524.292C538.698 131.114 550.375 119.437 550.375 105.031V27.0822C550.375 12.6762 538.698 1 524.292 1H45.2721C30.8661 1 19.19 12.6762 19.19 27.0822V105.004C19.19 120.6 12.7032 131.087 1 131.087C1 131.087 16.5142 132.141 29.8931 126.005L29.8661 126.032Z" stroke="#8529A8" stroke-miterlimit="10"/>
                        </svg>
                        <div class="message-overlay">
                            <p>${message.message}</p>
                        </div>
                    </div>   
                </div>`
                messageHist.innerHTML += otherMessageHTML;
            }
        });
        
    })
    .catch(error => {
        console.log("Error:", error);
    });
}
var myCount = 0;
function createRandomSVG() {
    // if(localStorage.setItem("myC"))
    let svg = null;
    // Generate random values for the width and height parameters.
    const width = 82;
    const height = 82;
  
    // Generate random colors for the startColor and endColor parameters.
    var startColor =  getRandomColor();
    var endColor =  getRandomColor();

    console.log(startColor);
  
    // Create the SVG element and append the path and gradient to it.
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewbox", `0 0 ${width} ${height}`);
    svg.setAttribute("fill", "none");
  
    // Create the path element with the gradient fill.
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M0 15C0 6.71573 6.71573 0 15 0H67C75.2843 0 82 6.71573 82 15V67C82 75.2843 75.2843 82 67 82H15C6.71573 82 0 75.2843 0 67V15Z");
    path.setAttribute("fill", `url(#paint0_linear)`);
  
    // Create the linear gradient SVG element.
    let gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    gradient.setAttribute("id", "paint0_linear");
    gradient.setAttribute("x1", "-21.5");
    gradient.setAttribute("y1", "-19");
    gradient.setAttribute("x2", "132.757");
    gradient.setAttribute("y2", "-0.0122639");
    gradient.setAttribute("gradientUnits", "userSpaceOnUse");
  
    // Create two stop elements for the gradient.
    let stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("stop-color", startColor);
    gradient.appendChild(stop1);
  
    let stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("stop-color", endColor);
    stop2.setAttribute("offset", "1");
    gradient.appendChild(stop2);
  
    svg.appendChild(path);
    svg.appendChild(gradient);
    svg.setAttribute("id", myCount++);
  
    return svg;
  }

    // Generate a random color.
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
  
  
async function populateStudyGroups(){
    return new Promise((resolve, reject) => {
        const sideBar = document.getElementById("right-sidebar");
        fetch("../php/getStudyGroups.php", {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (const group of data) {
                groupHTML = `
                    <div class="studygroup" studygroupid="${group.id}">
                        ${createRandomSVG().outerHTML}
                    </div>`;
                sideBar.innerHTML += groupHTML;
            }
            sideBar.innerHTML += `
                <button id="plus-button" onclick="openPopup()">
                <i class="fa-solid fa-plus"></i>
                </button>
            `;

    
            
        }).then(() => {
            // Get the right sidebar element.
            const rightSidebar = document.getElementById("right-sidebar");
            
            // Get all the study group elements in the right sidebar.
            const studyGroupElements = rightSidebar.querySelectorAll(".studygroup");

            // Loop through the study group elements and add an event listener to each one.
            for (const studyGroupElement of studyGroupElements) {
                studyGroupElement.addEventListener("click", function() { 
                    let groupId = studyGroupElement.getAttribute("studygroupid");
                    const formData = new FormData();
                    formData.append("id", groupId);
                    fetch("../php/getStudyGroup.php", {
                        method: "POST",
                        body: formData,
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        document.getElementById("study-name").textContent = data[0].name;
                        document.getElementById("module-name").textContent = data[0].module;
                    })
                    
                    show_messages_of(groupId); 
                });
            }

            
            resolve();
        });
        
      });
    

    
}

document.addEventListener("DOMContentLoaded", function() {
    const messageBar = document.getElementById("message-bar");
    const form = document.getElementById("middle-bottom");
    const submitButton = document.getElementById("send-icon");
  
    
    form.addEventListener("submit", function(event) {
        const messageToSend = messageBar.value;
        const messageHist = document.getElementById("message-hist");
        myMessageHTML = 
        `<div class="my-message-group">
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
               </div>
               <div class="user-img">
                   <img src="/assets/background.png" alt="">
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

// Function to open the popup
function openPopup() {
    document.getElementById("overlay").style.display = "block";
}

// Function to close the popup
function closePopup() {
    document.getElementById("overlay").style.display = "none";
}
  

  // Function to handle the user input submission
function submitInput() {
    // Get the user input value
    var name = document.getElementById("userInputStudyGroup").value;
    var module = document.getElementById("userInputModule").value;
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("module", module);
       //   Make an AJAX POST request
    fetch("../php/createStudyGroup.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            let groupId = getCount()+1;
            console.log("Data inserted successfully!");
            const plus_button = document.getElementById("plus-button");
            groupHTML = `
                    <div class="studygroup" studygroupid="${groupId }">
                        ${createRandomSVG().outerHTML}
                    </div>`;
            // Create a new DOM element from the groupHTML variable.
            const newGroupElement = document.createElement('div');
            newGroupElement.innerHTML = groupHTML;
            newGroupElement.addEventListener("click", function() { 
                
                const formData = new FormData();
                formData.append("id", groupId);
                fetch("../php/getStudyGroup.php", {
                    method: "POST",
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    document.getElementById("study-name").textContent = data[0].name;
                    document.getElementById("module-name").textContent = data[0].module;
                })
                
                show_messages_of(groupId); 
            });
            plus_button.before(newGroupElement);
        } else {
            console.log("Data insertion failed!");
            console.log(data.sql)
        }
    })
    .catch(error => {
        console.log("Error:", error);
    });
    
    function getCount(){
        return document.getElementById("right-sidebar").querySelectorAll(".studygroup").length
    }

    // Close the popup
    closePopup();
}
