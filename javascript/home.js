const data = [];
let voteChanges = {};

var curUsername = '';

filter = 'All;'

function fetchDataFromServer(filter) {
    // Create an array to store promises for updateVotes
    const updatePromises = [];
    

    // Iterate over voteChanges and create a promise for each vote update
    for (const questionId in voteChanges) {
        const voteType = voteChanges[questionId];
        const updatePromise = fetch('../php/vote.php', {
            method: 'POST',
            body: JSON.stringify({ "questionId": questionId, "voteType": voteType }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(responseData => {
            // Handle the server response as needed
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // Add the promise to the array
        updatePromises.push(updatePromise);
    }

    // Use Promise.all to wait for all vote updates to complete
    Promise.all(updatePromises)
    .then(() => {
        // After all vote updates are completed, fetch question data
        return fetch('../php/getQuestions.php');
    })
    .then(response => response.json())
    .then(result => {
        // Store the retrieved data in the 'data' variable
        data.length = 0; // Clear existing data
        data.push(...result);

        // Call the 'filterCards' function to display the data
        voteChanges = {};
        filterCards(filter);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}


async function getCurUsername() {
    try {
        const response = await fetch('../php/getCurrentUsername.php');
        const username = await response.text();
        curUsername = username;
        // Once curUsername is assigned, call fetchDataFromServer
        fetchDataFromServer('All');
    } catch (error) {
        console.error('Error:', error);
    }
}

function filterCards(module) {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';

    const filterButtons = document.querySelectorAll('.home-navigation button');

    filterButtons.forEach((button) => {
        button.classList.remove('current-selected');
    });

    filterButtons.forEach((button) => {
        if (button.textContent === module) {
            button.classList.add('current-selected');
        }
    });

    data.forEach((data) => {
        if (module === 'All' || data.moduleName === module) {
            const card = document.createElement('div');
            card.classList.add('card');

            console.log(data);
            // Check if the profilePic URL is empty or invalid, and use the default profile picture if needed
            const profilePicSrc = data.profilePic == '' ? 'assets/ProfilePic.png' : data.profilePic;

            const upvotedUsers = JSON.parse(data.upvotedUsers);
            const downvotedUsers = JSON.parse(data.downvotedUsers);

            card.innerHTML = `
                <div class="card-header">
                    <div class="profile">
                        <div class="name-and-picture">
                            <div class="profile-image">
                                <img src="${profilePicSrc}" alt="${data.name}">
                            </div>
                            <div class="name">${data.name}</div>
                        </div>
                        <div class="module-name">${data.moduleName}</div>
                    </div>
                </div>
                <div class="card-text-info">
                    <div class="card-title">${data.title}</div>
                    <div class="card-description">
                        ${data.description.length > 100 ? data.description.slice(0, 100) + '...' : data.description}
                    </div>
                </div>
                <div class="actions">
                    <button class="vote-button upvote-button" onclick="upvote(${data.id})">
                        <img src="${upvotedUsers.includes(curUsername) ? 'assets/upvoteFilled.png' : 'assets/upvoteOutline.png'}" alt="Upvote" id="upvote${data.id}">
                        <span id="upvote-count-${data.id}" class="counter">${data.upvotes}</span>
                    </button>
                    <button class="vote-button downvote-button" onclick="downvote(${data.id})">
                        <img src="${downvotedUsers.includes(curUsername) ? 'assets/downvoteFilled.png' : 'assets/downvoteOutline.png'}" alt="Downvote" id="downvote${data.id}">
                        <span id="downvote-count-${data.id}" class="counter">${data.downvotes}</span>
                    </button>
                    <button class="action-button comment-button" onclick="redirectToThread(${data.id})">
                        <img src="assets/comment.png" alt="Comment" style="width:27px;">
                        <span class="counter">${data.totalComments}</span>
                    </button>
                    <button class="action-button share-button">
                        <img src="assets/share.png" alt="Share" style="width:27px;">
                    </button>
                </div>
            `;

            cardContainer.appendChild(card);
        }
    });
}

// Function to check if a profilePic URL is invalid (empty or doesn't lead to a valid image)
function isInvalidProfilePic(profilePicUrl) {
    return !profilePicUrl || !isValidImageUrl(profilePicUrl);
}

// Function to check if an image URL is valid (exists and is accessible)
function isValidImageUrl(url) {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth !== 0;
}




function upvote(questionId) {
    var imgElement = document.getElementById("upvote" + questionId);
    var otherImgElement = document.getElementById("downvote" + questionId);

    if(imgElement.src.endsWith("upvoteOutline.png") && otherImgElement.src.endsWith("downvoteOutline.png")){
        // Add a upvote to this questionID
        otherImgElement.src = "assets/downvoteOutline.png";
        imgElement.src = "assets/upvoteFilled.png";
        document.getElementById(`upvote-count-${questionId}`).textContent = parseInt(document.getElementById(`upvote-count-${questionId}`).textContent) + 1;

        voteChanges[questionId] = 'upvote';
    }
    else if(otherImgElement.src.endsWith("downvoteFilled.png")){
        // Add a upvote to this questionID and remove a downvote
        otherImgElement.src = "assets/downvoteOutline.png";
        imgElement.src = "assets/upvoteFilled.png";
        document.getElementById(`upvote-count-${questionId}`).textContent = parseInt(document.getElementById(`upvote-count-${questionId}`).textContent) + 1;
        document.getElementById(`downvote-count-${questionId}`).textContent = parseInt(document.getElementById(`downvote-count-${questionId}`).textContent) - 1;

        voteChanges[questionId] = 'upvote';
    }
    else if(imgElement.src.endsWith("upvoteFilled.png")){
        imgElement.src = "assets/upvoteOutline.png";
        document.getElementById(`upvote-count-${questionId}`).textContent = parseInt(document.getElementById(`upvote-count-${questionId}`).textContent) - 1;

        voteChanges[questionId] = 'removeVote';
    }
}

function downvote(questionId) {
    var imgElement = document.getElementById("downvote" + questionId);
    var otherImgElement = document.getElementById("upvote" + questionId);

    if(otherImgElement.src.endsWith("upvoteOutline.png") && imgElement.src.endsWith("downvoteOutline.png")){
        // Add a downvote to this questionID
        otherImgElement.src = "assets/upvoteOutline.png";
        imgElement.src = "assets/downvoteFilled.png";
        document.getElementById(`downvote-count-${questionId}`).textContent = parseInt(document.getElementById(`downvote-count-${questionId}`).textContent) + 1;

        voteChanges[questionId] = 'downvote';
    }
    else if(otherImgElement.src.endsWith("upvoteFilled.png")){
        // Add a downvote to this questionID and remove a upvote
        otherImgElement.src = "assets/upvoteOutline.png";
        imgElement.src = "assets/downvoteFilled.png";
        document.getElementById(`downvote-count-${questionId}`).textContent = parseInt(document.getElementById(`downvote-count-${questionId}`).textContent) + 1;
        document.getElementById(`upvote-count-${questionId}`).textContent = parseInt(document.getElementById(`upvote-count-${questionId}`).textContent) - 1;

        voteChanges[questionId] = 'downvote';
    }
    else if(imgElement.src.endsWith("downvoteFilled.png")){
        imgElement.src = "assets/downvoteOutline.png";
        document.getElementById(`downvote-count-${questionId}`).textContent = parseInt(document.getElementById(`downvote-count-${questionId}`).textContent) - 1;

        voteChanges[questionId] = 'removeVote';
    }
}

window.addEventListener('beforeunload', function (e) {
    updateVotes();
});

function updateVotes(){
    for (const questionId in voteChanges) {
        const voteType = voteChanges[questionId];
        fetch('../php/vote.php', {
            method: 'POST',
            body: JSON.stringify({ "questionId": questionId, "voteType": voteType }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(responseData => {
                // Handle the server response as needed
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}


function updateVoteCount(questionId, upvotes, downvotes) {
    // Update the vote count display for the given question
    const upvoteCountElement = document.getElementById(`upvote-count-${questionId}`);
    const downvoteCountElement = document.getElementById(`downvote-count-${questionId}`);

    if (upvoteCountElement && downvoteCountElement) {
        upvoteCountElement.textContent = upvotes;
        downvoteCountElement.textContent = downvotes;
    }
}


function activateOverlay(){
    document.querySelector('#overlay').style.display = 'flex';
}

function deactivateOverlay(){
    document.querySelector('#overlay').style.display = 'none';
}

function redirectToThread(cardId) {
    window.location.href = `thread.php?id=${cardId}`;
}


window.addEventListener('load', () => {
    //deactivateOverlay();
    getCurUsername();
});

function validateForm() {
    const topic = document.getElementById("topic").value.trim();
    const module = document.getElementById("module").value.trim();
    const description = document.getElementById("description").value.trim();

    if (topic === "" || module === "" || description === "") {
        alert("All fields are required.");
        return false;
    }

    return true; // Allow form submission
}

