const threadInfo = [
    {
        cardId: 1,
        profilePic: '',
        name: 'John Doe',
        moduleName: 'COS 332',
        title: 'Question 1',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
        totalComments: 0
    }
];

const comments = [
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
    {
        commentId: 1,
        profilePic: '',
        name: 'John Doe',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0,
    },
];

function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
}

function loadThreadContent() {
    const cardId = getQueryParam('id');
    const threadContentContainer = document.getElementById('thread-content');

    const thread = threadInfo[0];
   
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
            <button type="submit" class='comment-button'>Add</button>
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
                <img src="${comment.profilePic || 'assets/ProfilePic.png'}" alt="${comment.name}">
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

window.addEventListener('load', loadThreadContent);
