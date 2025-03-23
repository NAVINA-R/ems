import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load dataset (use your dataset)
df = pd.read_csv("campus_energy_consumption.csv")

# Define features and target variable
X = df[["Day", "Hour", "Temperature_C", "Humidity_%", "Occupancy", "Renewable_Energy_kW", "Event_Flag"]]
y = df["Energy_Consumption_kW"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "energy_prediction_model.pkl")

print("Model trained and saved as energy_prediction_model.pkl")
