const threadInfo = [];
const comments = [];
cardId = null;
let voteChanges = {}; 
var curUsername = '';

async function getCurUsername() {
    try {
        const response = await fetch('../php/getCurrentUsername.php');
        const username = await response.text();
        curUsername = username;
    } catch (error) {
        console.error('Error:', error);
    }
}

window.addEventListener('load', () => {
    getCurUsername().then(() => {
        loadThreadContent();
    });
});

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

function loadThreadContent() {
    cardId = getQueryParam('id');
    const threadContentContainer = document.getElementById('thread-content');

    fetch(`../php/getThreadData.php?cardId=${cardId}`)
    .then((response) => response.json())
    .then((data) => {
        const thread = data.threadInfo[0];

        threadInfo.push({
            cardId: thread.id,
            profilePic: thread.profilePic,
            name: thread.name,
            moduleName: thread.moduleName,
            title: thread.title,
            description: thread.description,
            upvotes: thread.upvotes,
            downvotes: thread.downvotes,
            totalComments: thread.totalComments
        });

        data.comments.reverse();

        data.comments.forEach((comment) => {
            comments.push({
                commentId: comment.id,
                profilePic: comment.profilePic,
                name: comment.name,
                description: comment.description,
                upvotes: comment.upvotes,
                downvotes: comment.downvotes
            });
        });

        const upvotedUsers = JSON.parse(thread.upvotedUsers);
        const downvotedUsers = JSON.parse(thread.downvotedUsers);

        const questionContent = document.createElement('div');
        questionContent.classList.add('question-content');
        questionContent.innerHTML = `
            <div class="profile">
                <div class="profile-image">
                    <img src="${getValidProfilePicUrl(thread.profilePic)}" alt="${thread.name}">
                </div>
                <div class="name">${thread.name}</div>
                <div class="module-name">${thread.moduleName}</div>
            </div>
            <div class="question-title">${thread.title}</div>
            <div class="question-description">${thread.description}</div>
            <div class="actions">
                <button class="vote-button upvote-button" onclick="upvote(${thread.id})">
                    <img src="${upvotedUsers.includes(curUsername) ? 'assets/upvoteFilled.png' : 'assets/upvoteOutline.png'}" alt="Upvote" id="upvote${thread.id}">
                    <span id="upvote-count-${thread.id}" class="counter">${thread.upvotes}</span>
                </button>
                <button class="vote-button downvote-button" onclick="downvote(${thread.id})">
                    <img src="${downvotedUsers.includes(curUsername) ? 'assets/downvoteFilled.png' : 'assets/downvoteOutline.png'}" alt="Downvote" id="downvote${thread.id}">
                    <span id="downvote-count-${thread.id}" class="counter">${thread.downvotes}</span>
                </button>
                <button class="action-button comment-button">
                    <img src="assets/comment.png" alt="Comment" style="width:27px;">   
                    <span class="counter">${thread.totalComments}</span>
                </button>
            </div>
        `;
        const commentBox = document.createElement('div');
        commentBox.classList.add('comment-box');
        commentBox.innerHTML = `
            <div class="comment-wrapper">
                <label for="comment-box">Add Comment</label> <br>
                <textarea id="description" name="comment-box" rows="4"></textarea><br/>
                <button onClick="addComment()" class='comment-button'>Add</button>
            </div>
        `;

        const margin = document.createElement('div');
        margin.classList.add('margin');

        threadContentContainer.appendChild(questionContent);
        threadContentContainer.appendChild(commentBox);

        const commentsSection = document.createElement('div');
        commentsSection.classList.add('comments-section');
        commentsSection.innerHTML = `<div class='margin'></div>`

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <div class="profile">
                    <div class="profile-image">
                        <img src="${getValidProfilePicUrl(comment.profilePic)}" alt="profile-pic" class="profile-pic">
                    </div>
                    <div class="name">${comment.name}</div>
                </div>
                <div class="comment-description">${comment.description}</div>
            `;

            commentsSection.appendChild(commentElement);
        });

        threadContentContainer.appendChild(commentsSection);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

function getValidProfilePicUrl(profilePicUrl) {
    return  profilePicUrl == '' ? 'assets/ProfilePic.png' : profilePicUrl;
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

function loadHomePage() {
    window.location.href = "home.php";
}

function addComment() {
    const comment = document.getElementById("description").value;
    const questionId = cardId;

    // Check if the comment is empty
    if (comment.trim() === "") {
        console.error("Comment cannot be empty.");
        return;
    }

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("questionId", questionId);

    fetch("../php/addComment.php", {
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((newCommentData) => {
        addCommentToSection(newCommentData);

        document.getElementById("description").value = "";
    })
    .catch((error) => {
        console.error("Error adding comment:", error);
    });
}


function addCommentToSection(comment) {
    const commentsSection = document.querySelector('.comments-section');
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    // Ensure that the comment's profile pic URL is valid
    const validProfilePicUrl = getValidProfilePicUrl(comment.profilePic);

    commentElement.innerHTML = `
        <div class="profile">
            <img src="${validProfilePicUrl}" alt="profile-pic" class="profile-pic">
            <div class="name">${comment.name}</div>
        </div>
        <div class="comment-description">${comment.description}</div>
    `;

    commentsSection.insertBefore(commentElement, commentsSection.firstChild.nextSibling);

    const totalCommentsCounter = document.querySelector('.comment-button .counter');
    if (totalCommentsCounter) {
        const currentCount = parseInt(totalCommentsCounter.textContent, 10);
        totalCommentsCounter.textContent = currentCount + 1;
    }
}





