document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:5000/predict")
        .then(response => response.json())
        .then(data => {
            const peakHours = data.peak_hours;
            const displayDiv = document.getElementById("peak-hours");

            // Display Peak Hours Data
            let content = "<h3>Predicted Peak Hours</h3><ul>";
            for (let hour in peakHours) {
                content += `<li>${hour}:00 - ${peakHours[hour].toFixed(2)} kW</li>`;
            }
            content += "</ul>";

            displayDiv.innerHTML = content;

            // Prepare Data for Charts
            const labels = Object.keys(peakHours);
            const values = Object.values(peakHours);

            // Pie Chart: Energy Distribution
            const pieCtx = document.getElementById("energyPieChart").getContext("2d");
            new Chart(pieCtx, {
                type: "pie",
                data: {
                    labels: labels.map(hour => `${hour}:00`),
                    datasets: [{
                        label: "Energy Consumption (kW)",
                        data: values,
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#8E44AD"],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top"
                        }
                    }
                }
            });

            // Bar Chart: Energy Consumption at Different Hours
            const barCtx = document.getElementById("energyBarChart").getContext("2d");
            new Chart(barCtx, {
                type: "bar",
                data: {
                    labels: labels.map(hour => `${hour}:00`),
                    datasets: [{
                        label: "Energy Consumption (kW)",
                        data: values,
                        backgroundColor: "#36A2EB",
                        borderColor: "#2A7FC1",
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

        })
        .catch(error => console.error("Error fetching peak hour data:", error));
});
