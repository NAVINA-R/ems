document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll(".error").forEach(error => error.textContent = "");

    // Username validation
    if (username.value.trim() === "") {
        showError(username, "Username is required");
        isValid = false;
    }

    // Email validation
    if (!isValidEmail(email.value)) {
        showError(email, "Invalid email address");
        isValid = false;
    }

    // Password validation
    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters");
        isValid = false;
    }

    // Confirm Password validation
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "Passwords do not match");
        isValid = false;
    }

    // If all inputs are valid, submit form (for now, just alert success)
    if (isValid) {
        alert("Signup successful!");
        this.reset(); // Reset the form after submission
    }
});

// Function to show error messages
function showError(input, message) {
    let errorElement = input.nextElementSibling;
    errorElement.textContent = message;
}

// Function to validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
