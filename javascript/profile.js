document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('add-overlay');

    const registeredModules = document.getElementById('registeredModules');
    registeredModules.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('add-btn')) {
            overlay.style.display = 'flex';
        }
    });

    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
    });


    ///STOP PROP
    const overlayDiv = document.querySelector('.overlay-inner-wrapper');

    overlayDiv.addEventListener('click', function(event) {
        event.stopPropagation();
    });


    ///UPLOADING PROFILE IMAGES

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
                $('.message').addClass('message-animate');

                setTimeout(function() {
                    $('.message').removeClass('message-animate');
                }, 2200);
            },
            error: function(xhr, status, error) {
                console.error('Error uploading file:', error);
            }
        });
    }    


    ///CHANGING ABOUT BTN DISPLAY
    document.getElementById('aboutme').addEventListener('input', function() {
        document.querySelector('.update-profile-btn').style.display = 'block';
    });

    ///CHANGING DEGREE BTN DISPLAY
    document.getElementById('degree').addEventListener('input', function() {
        document.querySelector('.update-degree-btn').style.display = 'block';
    });

    ///MODULE INPUT VALIDATION
    document.querySelector('.addModuleBtn').addEventListener('click', function() {
        const input = document.querySelector('input');
        const formatMsg = document.querySelector('.formatMsg');
    
        const regex = /^[A-Za-z]{3}\s\d{3}$/;
    
        if (regex.test(input.value)) {
            // formatMsg.textContent = 'Format: Valid';
            // formatMsg.style.color = 'green';
            formatMsg.style.color = 'black';

            const moduleCode = input.value.toUpperCase();

            $.ajax({
                url: '/php/addModule.php',
                type: 'POST',
                data: {
                    moduleCode: moduleCode
                },
                success: function(response) {
                    input.value = '';
                    overlay.click();
                    console.log('res: ', response);


                    if (response !== 'User not found') {
                        const moduleCodes = response.split(',');
            
                        const registeredModules = document.getElementById('registeredModules');
            
                        registeredModules.innerHTML = '';
            
                        // Insert the new modules
                        moduleCodes.forEach(function(moduleCode) {
                            const moduleDiv = document.createElement('div');
                            moduleDiv.className = 'module';
                            moduleDiv.textContent = moduleCode.trim();

                            const removeModuleDiv = document.createElement('div');
                            removeModuleDiv.className = 'remove-module';
                            removeModuleDiv.onclick = function() {
                                removeModule(moduleCode.trim());
                            }

                            const xmarkIcon = document.createElement('i');
                            xmarkIcon.className = 'fa-solid fa-xmark';

                            removeModuleDiv.appendChild(xmarkIcon);
                            moduleDiv.appendChild(removeModuleDiv);
                            registeredModules.appendChild(moduleDiv);
                        });

                        const addBtnDiv = document.createElement('div');
                        addBtnDiv.className = 'add-btn';
                        addBtnDiv.innerHTML = '<i class="fa-solid fa-plus"></i>';
                        registeredModules.appendChild(addBtnDiv);
                    }


                    $('.moduleMessage').addClass('moduleMessage-animate');

                    setTimeout(function() {
                        $('.moduleMessage').removeClass('moduleMessage-animate');
                    }, 2200);
                },
                error: function(xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        } else {
            formatMsg.style.color = 'red';
        }
    });
});

function updateProfile() {
    var aboutMe = $('#aboutme').val();
    
    $.ajax({
        url: '../php/updateAbout.php',
        type: 'POST',
        data: { aboutMe: aboutMe },
        success: function(response) {
            console.log('Profile updated successfully');
            document.querySelector('.update-profile-btn').style.display = 'none';

            $('.aboutMessage').addClass('aboutMessage-animate');

            setTimeout(function() {
                $('.aboutMessage').removeClass('aboutMessage-animate');
            }, 2200);
        },
        error: function(xhr, status, error) {
            console.error('Error updating profile:', error);
        }
    });
}

function updateDegree() {
    var degree = $('#degree').text();

    $.ajax({
        url: '../php/updateDegree.php',
        type: 'POST',
        data: { degree: degree },
        success: function(response) {
            console.log('Degree updated successfully');
            document.querySelector('.update-degree-btn').style.display = 'none';

            $('.degreeMessage').addClass('degreeMessage-animate');

            setTimeout(function() {
                $('.degreeMessage').removeClass('degreeMessage-animate');
            }, 2200);

        },
        error: function(xhr, status, error) {
            console.error('Error updating degree:', error);
        }
    });
}

function removeModule(moduleCode) {
    $(".module:contains(" + moduleCode + ")").remove();

    $.ajax({
        type: "POST",
        url: "../php/removeModule.php",
        data: { moduleCode: moduleCode },
        success: function(response) {
            if (response === "success") {
                console.log('module removed successfully');

                $('.removeMessage').addClass('removeMessage-animate');

                setTimeout(function() {
                    $('.removeMessage').removeClass('removeMessage-animate');
                }, 2200);
            } else {
                console.log("Error removing module: " + response);
            }
        }
    });
}