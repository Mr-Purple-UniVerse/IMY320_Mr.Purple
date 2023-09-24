const threadInfo = [];
const comments = [];
cardId = null;

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
                profilePic: '',
                name: comment.name,
                description: comment.description,
                upvotes: comment.upvotes,
                downvotes: comment.downvotes
            });
        });

        const questionContent = document.createElement('div');
        questionContent.classList.add('question-content');
        questionContent.innerHTML = `
            <div class="profile">
                <img src="${thread.profilePic || 'assets/ProfilePic.png'}" alt="${thread.name}">
                <div class="name">${thread.name}</div>
                <div class="module-name">${thread.moduleName}</div>
            </div>
            <div class="question-title">${thread.title}</div>
            <div class="question-description">${thread.description}</div>
            <div class="actions">
                <button class="vote-button upvote-button" onclick="upvote(this)">
                        <img src="assets/upvote.png" alt="Upvote">
                        <span class="counter">${thread.upvotes}</span>
                </button>
                <button class="vote-button downvote-button" onclick="downvote(this)">
                    <img src="assets/downvote.png" alt="Downvote">
                    <span class="counter">${thread.downvotes}</span>
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
        //threadContentContainer.appendChild(margin);

        const commentsSection = document.createElement('div');
        commentsSection.classList.add('comments-section');
        commentsSection.innerHTML = `<div class='margin'></div>`

        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <div class="profile">
                    <img src="${comment.profilePic || 'assets/ProfilePic.png'}" alt="${comment.name}" class="profile-pic">
                    <div class="name">${comment.name}</div>
                </div>
                <div class="comment-description">${comment.description}</div>
                <div class="actions">
                    <button class="vote-button upvote-button">
                        <img src="assets/upvote.png" alt="Upvote">
                        <span class="counter">${comment.upvotes}</span>
                    </button>
                    <button class "vote-button downvote-button">
                        <img src="assets/downvote.png" alt="Downvote">
                        <span class="counter">${comment.downvotes}</span>
                    </button>
                </div>
            `;

            commentsSection.appendChild(commentElement);
        });

        threadContentContainer.appendChild(commentsSection);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

function upvote(button) {
    const counter = button.querySelector('.counter');
    if (counter) {
        const currentCount = parseInt(counter.textContent, 10);
        counter.textContent = currentCount + 1;
    }
}

function downvote(button) {
    const counter = button.querySelector('.counter');
    if (counter) {
        const currentCount = parseInt(counter.textContent, 10);
        counter.textContent = currentCount - 1;
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
    commentElement.innerHTML = `
        <div class="profile">
            <img src="${comment.profilePic || 'assets/ProfilePic.png'}" alt="${comment.name}" class="profile-pic">
            <div class="name">${comment.name}</div>
        </div>
        <div class="comment-description">${comment.description}</div>
        <div class="actions">
            <button class="vote-button upvote-button">
                <img src="assets/upvote.png" alt="Upvote">
                <span class="counter">${comment.upvotes}</span>
            </button>
            <button class="vote-button downvote-button">
                <img src="assets/downvote.png" alt="Downvote">
                <span class="counter">${comment.downvotes}</span>
            </button>
        </div>
    `;

    commentsSection.insertBefore(commentElement, commentsSection.firstChild.nextSibling);

    const totalCommentsCounter = document.querySelector('.comment-button .counter');
    if (totalCommentsCounter) {
        const currentCount = parseInt(totalCommentsCounter.textContent, 10);
        totalCommentsCounter.textContent = currentCount + 1;
    }
}




window.addEventListener('load', loadThreadContent);
