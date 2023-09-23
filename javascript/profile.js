document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.querySelector('.add-btn');
    const overlay = document.getElementById('add-overlay');

    addBtn.addEventListener('click', function() {
        overlay.style.display = 'block';
    });

    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
    });
});