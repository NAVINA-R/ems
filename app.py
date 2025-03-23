from flask import Flask, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

# Load trained model
model = joblib.load("energy_prediction_model.pkl")

@app.route('/predict', methods=['GET'])
def predict_peak_hours():
    # Sample input for prediction
    example_data = pd.DataFrame({
        "Day": [1, 1, 1, 1, 1, 1],
        "Hour": [8, 10, 12, 15, 18, 20],
        "Temperature_C": [24, 26, 27, 28, 26, 22],
        "Humidity_%": [65, 60, 55, 50, 58, 70],
        "Occupancy": [40, 80, 120, 90, 100, 50],
        "Renewable_Energy_kW": [8, 12, 15, 10, 14, 9],
        "Event_Flag": [0, 1, 1, 0, 1, 0]
    })

    # Predict energy consumption
    predictions = model.predict(example_data)

    peak_hours = {
        str(example_data["Hour"][i]): round(predictions[i], 2)
        for i in range(len(predictions))
    }

    return jsonify({"peak_hours": peak_hours})

if __name__ == '__main__':
    app.run(debug=True)
