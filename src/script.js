// Selecting the input element for multiple files
const inputFile = document.querySelector('#picture_input');
const pictureImage = document.querySelector('.picture_image');
const pictureImageTxt = 'Choose an image';
pictureImage.innerHTML = pictureImageTxt;

// Adding an event listener for when files are selected
inputFile.addEventListener('change', function(e) {
    const inputTarget = e.target;
    const files = inputTarget.files;

    if (files.length > 0) {
        // Iterate over the selected files
        Array.from(files).forEach(file => {
            // Create a FileReader to read the content of each image
            const reader = new FileReader();

            reader.addEventListener('load', function(e) {
                const readerTarget = e.target;
                const img = document.createElement('img');
                img.src = readerTarget.result;
                img.classList.add('picture_image');
                // Add the image to the pictureImage div
                pictureImage.innerHTML= ''
                pictureImage.appendChild(img);
            });
            // Start reading the current file
            reader.readAsDataURL(file);
        });

        // Display the progress bar
        document.getElementById('progress');
    } else {
        // If no files are selected, display the default message
        pictureImage.innerHTML = pictureImageTxt;
        // Hide the progress bar
        document.getElementById('progress');
    }
});

// Upload Button
const uploadButton = document.querySelector('#uploadButton');
uploadButton.addEventListener('click', () => {
    const files = document.querySelector('#picture_input').files;
    const formData = new FormData();

    // Add all files to FormData
    Array.from(files).forEach(file => {
        formData.append('images[]', file);
    });

    // Use fetch to send the data
    fetch('/upload', {
        method: 'POST',
        body: formData,
        // Configure the request progress
        onProgress: function(e) {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                document.getElementById('progress').innerText = `${Math.round(percentComplete)}%`;
            }
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Images sent successfully.');
        } else {
            console.error('Error sending images.');
        }
    })
    .catch(error => {
        console.error('Error sending images:', error);
    });
});
