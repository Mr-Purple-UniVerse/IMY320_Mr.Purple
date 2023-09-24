document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.querySelector('.add-btn');
    const overlay = document.getElementById('add-overlay');

    addBtn.addEventListener('click', function() {
        overlay.style.display = 'block';
    });

    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
    });

    const userImgDiv = document.getElementById('userImg');
    const fileInput = document.getElementById('fileToUpload');
    
    userImgDiv.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = userImgDiv.querySelector('img');
                img.src = e.target.result;
                uploadFile(file);
            }
            reader.readAsDataURL(file);
        }
    });
    
    function uploadFile(file) {
        const formData = new FormData();
        formData.append('fileToUpload', file);
    
        $.ajax({
            url: '/php/uploadPhoto.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log('File uploaded successfully');
                // Optionally, you can handle the response from the server here
            },
            error: function(xhr, status, error) {
                console.error('Error uploading file:', error);
            }
        });
    }    
});