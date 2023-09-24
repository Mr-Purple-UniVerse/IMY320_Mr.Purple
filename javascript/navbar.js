const currentPath = window.location.pathname;

const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(navItem => {
    const navItemText = navItem.querySelector('p').textContent;
    
    if (currentPath === "/home.php" && navItemText === "Home") {
        navItem.classList.add('selected');
    }

    if (currentPath === "/resources.php" && navItemText === "Resources") {
        navItem.classList.add('selected');
    }

    if (currentPath === "/study.php" && navItemText === "Study Groups") {
        navItem.classList.add('selected');
    }

    if (currentPath === "/profile.php" && navItemText === "Profile") {
        navItem.classList.add('selected');
    }
});



// Get a reference to the button element
const homeButton = document.getElementById("home-button");
const resourceButton = document.getElementById("resources-button");
const mapButton = document.getElementById("map-button");
const chatButton = document.getElementById("chat-button");
const profileButton = document.getElementById("profile-button");

// Add a click event listener to the button
homeButtontButton.addEventListener("click", function () {
    console.log("clicked")
    // Specify the URL you want to redirect to
    const redirectTo = "./home.php"; // Replace with your desired URL

    // Redirect the user to the specified URL
    window.location.href = redirectTo;
});

resourceButton.addEventListener("click", function () {
    console.log("clicked")
    // Specify the URL you want to redirect to
    const redirectTo = "./resource.php"; // Replace with your desired URL

    // Redirect the user to the specified URL
    window.location.href = redirectTo;
});

mapButton.addEventListener("click", function () {
    console.log("clicked")
    // Specify the URL you want to redirect to
    const redirectTo = "./map.php"; // Replace with your desired URL

    // Redirect the user to the specified URL
    window.location.href = redirectTo;
});

chatButton.addEventListener("click", function () {
    console.log("clicked")
    // Specify the URL you want to redirect to
    const redirectTo = "./chat.php"; // Replace with your desired URL

    // Redirect the user to the specified URL
    window.location.href = redirectTo;
});

profileButton.addEventListener("click", function () {
    console.log("clicked")
    // Specify the URL you want to redirect to
    const redirectTo = "./profile.php"; // Replace with your desired URL

    // Redirect the user to the specified URL
    window.location.href = redirectTo;
});