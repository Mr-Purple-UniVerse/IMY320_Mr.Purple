const mockData = [
    {
        profilePic: '',
        name: 'John Doe',
        moduleName: 'COS 332',
        title: 'Question 1',
        description: 'This is the first question description.',
        upvotes: 0,
        downvotes: 0
    },
    {
        profilePic: '',
        name: 'Jane Smith',
        moduleName: 'COS 333',
        title: 'Question 2',
        description: 'This is the second question description.',
        upvotes: 0,
        downvotes: 0
    },
    {
        profilePic: '',
        name: 'Bob Johnson',
        moduleName: 'COS 320',
        title: 'Question 3',
        description: 'This is the third question description.',
        upvotes: 0,
        downvotes: 0
    },
    {
        profilePic: '',
        name: 'Alice Brown',
        moduleName: 'COS 301',
        title: 'Question 4',
        description: 'This is the fourth question description.',
        upvotes: 0,
        downvotes: 0
    },
    {
        profilePic: '',
        name: 'Alice Brown',
        moduleName: 'COS 301',
        title: 'Question 4',
        description: 'This is the fourth question description.',
        upvotes: 0,
        downvotes: 0
    },
    {
        profilePic: '',
        name: 'Alice Brown',
        moduleName: 'COS 301',
        title: 'Question 4',
        description: 'This is the fourth question description.',
        upvotes: 0,
        downvotes: 0
    },
    {
        profilePic: '',
        name: 'Alice Brown',
        moduleName: 'COS 301',
        title: 'Question 4',
        description: 'This is the fourth question description.',
        upvotes: 0,
        downvotes: 0
    },
    {
        profilePic: '',
        name: 'Alice Brown',
        moduleName: 'COS 301',
        title: 'Question 4',
        description: 'This is the fourth question description.',
        upvotes: 0,
        downvotes: 0
    },
    {
        profilePic: '',
        name: 'Alice Brown',
        moduleName: 'COS 301',
        title: 'Question 4',
        description: 'This is the fourth question description.',
        upvotes: 0,
        downvotes: 0
    },
];

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

     mockData.forEach((data) => {
        if (module === 'All' || data.moduleName === module) {
            const card = document.createElement('div');
            card.classList.add('card');
    
            const profilePicSrc = data.profilePic.trim() === '' ? 'assets/ProfilePic.png' : data.profilePic;
    
            card.innerHTML = `
                <div class="card-header">
                    <div class="profile">
                        <div class="name-and-picture">
                            <img src="${profilePicSrc}" alt="${data.name}">
                            <div class="name">${data.name}</div>
                        </div>
                        <div class="module-name">${data.moduleName}</div>
                    </div>
                </div>
                <div class="card-title">${data.title}</div>
                <div class="card-description">${data.description}</div>
                <div class="actions">
                    <button class="vote-button upvote-button" onclick="upvote(this)">
                        <img src="assets/upvote.png" alt="Upvote">
                        <span class="counter">${data.upvotes}</span>
                    </button>
                    <button class="vote-button downvote-button" onclick="downvote(this)">
                        <img src="assets/downvote.png" alt="Downvote">
                        <span class="counter">${data.downvotes}</span>
                    </button>
                    <button class="action-button comment-button">
                        <img src="assets/comment.png" alt="Comment" style="width:27px;">
                        <span class="counter">0</span>
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

function activateOverlay(){
    mainHomeDiv = document.getElementById('mainHome');
    mainHomeDiv.style.display = 'none';

    overlay = document.getElementById('overlay');
    overlay.style.display = 'block'
}

function disableOverlay(){
    overlay = document.getElementById('overlay');
    overlay.style.display = 'none'

    mainHomeDiv = document.getElementById('mainHome');
    mainHomeDiv.style.display = 'block';  
}

filterCards('All');
disableOverlay();
