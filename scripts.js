document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            const password = document.getElementById("password").value;
            if (password.length < 6) {
                alert("Password must be at least 6 characters long!");
                event.preventDefault();
            } else {
                localStorage.setItem("loggedIn", "true"); // Store login state
                location.href = "index.html"; // Redirect to index page after login
            }
        });
    }
});

