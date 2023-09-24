// Get all elements with the class "clickable-link" and store them in a NodeList
const links = document.querySelectorAll('.nav-item');

// Initialize a variable to keep track of the active link
let activeLink = null;

// Define a function to handle link clicks
function handleLinkClick(event) {
    console.log("yay!");

    if (activeLink) {
        // If there is an active link, reset its appearance
        activeLink.classList.remove('nav-item-selected');
    }

    // Set the clicked link as the active link
    activeLink = event.target.tagName === "P" ? event.target.parentNode : event.target;

    // Change CSS styles for the clicked link
    activeLink.classList.add('nav-item-selected');
}

// Add a click event listener to each link
links.forEach(link => {
    link.addEventListener('click', handleLinkClick);
});




