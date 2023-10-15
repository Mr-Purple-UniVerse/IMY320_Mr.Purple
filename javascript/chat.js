// show_messages_of(1);
// populateStudyGroups().then(() => {
//     document.getElementById("right-sidebar").querySelector(".studygroup").click();
// });

function convertUnixTimestampToTime(unixTimestamp) {
    // Create a Date object from the Unix timestamp (in seconds)
    const date = new Date(unixTimestamp * 1000);
  
    // Extract hours and minutes from the Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Pad the single-digit hours and minutes with leading zeros if needed
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Combine the hours and minutes in the desired format (HH:MM)
    const timeFormat = formattedHours + ':' + formattedMinutes;
  
    return timeFormat;
  }
  
  // Example usage:
  const unixTimestamp = 1697187282;
  const formattedTime = convertUnixTimestampToTime(unixTimestamp);
  console.log(formattedTime); // Output: "19:58"
  
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
            if(message.userid === localStorage.getItem('userid')){
               myMessageHTML = `
                    <div class="message message-personal new">
                        <figure class="avatar-right">
                        <img src="${message.profilePhoto}">
                        </figure>${message.message}<div class="timestamp">${convertUnixTimestampToTime(message.timestamp)}</div>
                    </div>  
                `
                $(myMessageHTML).appendTo($('.mCSB_container')).addClass('new');
            }
            else{
                otherMessageHTML = `
                    <div class="message new">
                        <figure class="avatar">
                        <img src="${message.profilePhoto}">
                        </figure>${message.message}<div class="timestamp">${convertUnixTimestampToTime(message.timestamp)}</div>
                    </div>
                `
                $(otherMessageHTML).appendTo($('.mCSB_container')).addClass('new');
                
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
      
            
            // Get all the study group elements in the right sidebar.
            const studyGroupElements = sideBar.querySelectorAll(".studygroup");

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

// Function to open the popup
function openPopup() {
    console.log("open");
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


var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
}

function send(){
  insertMessage();
  msg = $('.message-input').val();
  const studyGroup = document.getElementById('study-name').textContent
  const formData = new FormData();
  formData.append("message", msg);
  formData.append("timestamp", Math.floor(Date.now() / 1000));
  formData.append("studygroup", studyGroup);
  formData.append("userid", localStorage.getItem('userid'));

  console.log(msg);
//   Make an AJAX POST request
  fetch("../php/insertChatMessage.php", {
      method: "POST",
      body: formData,
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          console.log("Data inserted successfully!");
      } else {
          console.log("Data insertion failed!");
          console.log(data.sql)
      }
  })
  .catch(error => {
      console.log("Error:", error);
  });
}

$('.message-submit').click(function() {
  send();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    send();
    return false;
  }
})

