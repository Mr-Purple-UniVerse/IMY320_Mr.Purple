const mockData = [
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
    },
    {
        cardId: 2,
        profilePic: '',
        name: 'Jane Smith',
        moduleName: 'COS 333',
        title: 'Question 2',
        description: 'This is the second question description.',
        upvotes: 0,
        downvotes: 0,
        totalComments: 0
    },
    {
        cardId: 3,
        profilePic: '',
        name: 'Bob Johnson',
        moduleName: 'COS 320',
        title: 'Question 3',
        description: 'This is the third question description.',
        upvotes: 0,
        downvotes: 0,
        totalComments: 0
    },
    {
        cardId: 4,
        profilePic: '',
        name: 'Alice Brown',
        moduleName: 'COS 301',
        title: 'Question 4',
        description: 'This is the fourth question description.',
        upvotes: 0,
        downvotes: 0,
        totalComments: 0
    },
    {
        cardId: 5,
        profilePic: '',
        name: 'Eve Johnson',
        moduleName: 'COS 332',
        title: 'Question 5',
        description: 'This is the fifth question description.',
        upvotes: 0,
        downvotes: 0,
        totalComments: 0
    },
    {
        cardId: 6,
        profilePic: '',
        name: 'Michael Smith',
        moduleName: 'COS 333',
        title: 'Question 6',
        description: 'This is the sixth question description.',
        upvotes: 0,
        downvotes: 0,
        totalComments: 0
    },
    {
        cardId: 7,
        profilePic: '',
        name: 'Emily Brown',
        moduleName: 'COS 320',
        title: 'Question 7',
        description: 'This is the seventh question description.',
        upvotes: 0,
        downvotes: 0,
        totalComments: 0
    },
    {
        cardId: 8,
        profilePic: '',
        name: 'Daniel Doe',
        moduleName: 'COS 301',
        title: 'Question 8',
        description: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
        upvotes: 0,
        downvotes: 0,
        totalComments: 0
    }
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

            card.addEventListener('click', () => {
                redirectToThread(data.cardId); 
            });

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
                <div class="card-description">
                    ${data.description.length > 100 ? data.description.slice(0, 100) + '...' : data.description}
                </div>
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
    overlay.style.display = 'flex'
}

function disableOverlay(){
    overlay = document.getElementById('overlay');
    overlay.style.display = 'none'

    mainHomeDiv = document.getElementById('mainHome');
    mainHomeDiv.style.display = 'block';  
}

function redirectToThread(cardId) {
    window.location.href = `thread.php?id=${cardId}`;
}

filterCards('All');
disableOverlay();
