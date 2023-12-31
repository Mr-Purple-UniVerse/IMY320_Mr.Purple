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

    if (currentPath === "/chat.php" && navItemText === "Study Group") {
        navItem.classList.add('selected');
    }

    if (currentPath === "/profile.php" && navItemText === "Profile") {
        navItem.classList.add('selected');
    }

    if (currentPath === "/team.php" && navItemText === "Meet the team") {
        navItem.classList.add('selected');
    }
});



