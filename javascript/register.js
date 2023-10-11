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
});

document.addEventListener('DOMContentLoaded', function() {
    var toggleIcon = document.getElementById('password-icon-confirm');
    var passwordInput = document.getElementById('confirmPassword');

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
});

function scrollToButton() {
    // var form = document.getElementById("registerForm");
    // var button = document.getElementById("sub");
    // form.scrollTo({
    //     top: button.offsetTop - form.offsetTop,
    //     behavior: 'smooth'
    // });
    const El = document.getElementById('registerForm');
    El.scrollTo({top: El.scrollHeight, behavior: 'smooth'});
}