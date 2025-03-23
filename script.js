document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const username = document.querySelector("input[type='text']");
    const password = document.querySelector("input[type='password']");

    form.addEventListener("submit", function (event) {
        if (username.value.trim() === "" || password.value.trim() === "") {
            alert("Please enter both username and password.");
            event.preventDefault();
        } else {
            alert("Login Successful!");
        }
    });

    username.addEventListener("focus", function () {
        username.style.backgroundColor = "#ffe6eb";
    });

    password.addEventListener("focus", function () {
        password.style.backgroundColor = "#ffe6eb";
    });

    username.addEventListener("blur", function () {
        username.style.backgroundColor = "white";
    });

    password.addEventListener("blur", function () {
        password.style.backgroundColor = "white";
    });
});
