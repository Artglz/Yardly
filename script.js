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



document.getElementById("myForm").onsubmit = async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        window.location.href = 'submitForm.html'; // Redirect to success page
    } else {
        alert('Failed to submit form');
    }
};
