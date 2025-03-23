document.addEventListener("DOMContentLoaded", function() {
    const floorBoxes = document.querySelectorAll(".floor-box a");

    floorBoxes.forEach(box => {
        box.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent instant navigation

            // Click animation
            this.parentElement.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.parentElement.style.transform = "scale(1)";
                window.location.href = this.href; // Navigate to the link after animation
            }, 150);
        });
    });
});
