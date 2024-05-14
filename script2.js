// script.js

function handleLogin(event) {
    event.preventDefault(); // Prevent form's default submission

    // Retrieve values from form fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Email:', email); // Debugging line
    console.log('Password:', password); // Debugging line

    if (email && password) {
        // Redirect to another page, e.g., dashboard.html
        window.location.href = 'dashboard.html';
    } else {
        alert('Please enter valid credentials.');
    }
    }