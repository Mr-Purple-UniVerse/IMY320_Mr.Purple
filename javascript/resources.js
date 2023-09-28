document.addEventListener('DOMContentLoaded', function() {
    ///STOP PROP
    const overlayDiv = document.querySelector('.overlay-inner-wrapper');

    overlayDiv.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // document.getElementById('submitResourceBtn').addEventListener('click', function() {
    //     document.querySelector('form').submit();
    // });

    //SUBMITTING RESOURCE
    $('#submitResourceBtn').click(function() {
        var formData = new FormData();

        var title = $('#resourceTitle').val();
        var moduleCode = $('#moduleCode').val();
        var description = $('#description').val();
        var file = $('#resourceFile')[0].files[0];

        formData.append('resourceTitle', title);
        formData.append('moduleCode', moduleCode);
        formData.append('description', description);
        formData.append('resourceFile', file);

        console.log(formData);

        $.ajax({
            url: '../php/uploadResource.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response === 'success') {
                    alert('Resource uploaded successfully!');
                    // Optionally, update the UI or do any additional tasks here
                } else {
                    alert('Error uploading resource: ' + response);
                }
            }
        });
    });



    ///SEARCH FILTER
    var searchInput = document.getElementById('searchResource');
        var resourceCards = document.querySelectorAll('.resource-card');

        searchInput.addEventListener('keyup', function() {
            var searchTerm = this.value.toLowerCase();

            resourceCards.forEach(function(card) {
                console.log('hiii');
                var resourceTitle = card.querySelector('.resource-title').innerText.toLowerCase();
                var resourceDescription = card.querySelector('.resource-description').innerText.toLowerCase();
                var resourceModule = card.querySelector('.resource-module').innerText.toLowerCase();

                if (resourceTitle.includes(searchTerm) || 
                    resourceDescription.includes(searchTerm) || 
                    resourceModule.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
});

function activateOverlay(){
    document.querySelector('#resourceOverlayOuterWrapper').style.display = 'flex';
}

function deactivateOverlay(){
    document.querySelector('#resourceOverlayOuterWrapper').style.display = 'none';
}

function reloadPage() {
    // window.location.reload();
    document.querySelector('#resourceOverlayOuterWrapper').style.display = 'none';
}