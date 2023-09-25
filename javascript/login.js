document.addEventListener('DOMContentLoaded', function() {
    var toggleIcon = document.getElementById('password-icon');
    var passwordInput = document.getElementById('password');

    toggleIcon.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    });

    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function(event) {
        console.log('trnya log in');
        event.preventDefault();

        // Get form data
        const formData = new FormData(loginForm);

        // Make a POST request to your PHP script
        fetch('../php/loginForm.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = "Invalid email or password. Please try again.";
            } else {    
                // Store a key-value pair in Local Storage
                localStorage.setItem('userid', data.id);

                // Redirect to the specified page
                window.location.href = "/home.php";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

