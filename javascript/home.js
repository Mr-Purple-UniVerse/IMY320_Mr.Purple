const data = [];

function fetchDataFromServer() {
    // Make an AJAX request to fetch data from the server
    fetch('../php/getQuestions.php') 
        .then(response => response.json())
        .then(result => {
            // Store the retrieved data in the 'data' variable
            data.length = 0; // Clear existing data
            data.push(...result);

            // Call the 'filterCards' function to display the data
            filterCards('All');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
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
                <div class="card-text-info">
                    <div class="card-title">${data.title}</div>
                    <div class="card-description">
                        ${data.description.length > 100 ? data.description.slice(0, 100) + '...' : data.description}
                    </div>
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
    document.querySelector('#overlay').style.display = 'flex';
}

function deactivateOverlay(){
    document.querySelector('#overlay').style.display = 'none';
}

function redirectToThread(cardId) {
    window.location.href = `thread.php?id=${cardId}`;
}


window.addEventListener('load', () => {
    // deactivateOverlay();
    fetchDataFromServer();
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

