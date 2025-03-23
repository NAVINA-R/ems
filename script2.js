document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("ul li a");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior

            // Add a brief animation
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
                window.location.href = this.href; // Navigate to the link after animation
            }, 150);
        });
    });
});
