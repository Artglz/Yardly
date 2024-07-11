function initAutocomplete() {
    var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('address'), { types: ['geocode'] });

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
    });
}

function submitForm() {
    const name = document.getElementById('name').value;
    const url = `submitForm.html?name=${name}`;
    window.location.href = url;
    return false;
  }

function showMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    document.getElementById('message').textContent = `Thank You, ${name}!`;
}

function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    
    // Store data in local storage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('address', address);
    
    window.location.href = 'submitForm.html';
    
    return false; // Prevent default form submission
}

function displayData() {
    // Retrieve data from local storage
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const address = localStorage.getItem('address');
  
    // Display the data
    // document.getElementById('name-display').innerText = name;
    // document.getElementById('email-display').innerText = email;
    // document.getElementById('address-display').innerText = address;
    document.getElementById('displayingInfo').innerHTML = "Hello, " + name + "! Your email is " + email + " and your address is " + address + ".";
}

window.onload = displayData;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Gather form data
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            // email: formData.get('email')
            phone: formData.get('phone'),
            address: formData.get('address')
        };

        // Send the form data to the server
        fetch('http://localhost:3000/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            // Display the response message
            document.getElementById('response-message').innerText = result;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('response-message').innerText = 'An error occurred. Please try again.';
        });
    });
});

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    window.location.href = 'submitForm.html';
});
