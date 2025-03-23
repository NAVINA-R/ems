from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import datetime

app1 = Flask(__name__)
CORS(app1)  # Enable cross-origin requests

# Initialize SQLite database
DB_NAME = "energy_data.db"

def init_db():
    """ Create a database table if not exists """
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS energy_log (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        timestamp TEXT,
                        building TEXT,
                        energy_usage REAL,
                        temperature REAL,
                        humidity REAL,
                        occupancy INTEGER,
                        renewable_energy REAL
                    )''')
    conn.commit()
    conn.close()

init_db()  # Initialize DB on startup

@app1.route('/log_energy', methods=['POST'])
def log_energy():
    """ Log energy data into the database """
    data = request.json
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO energy_log (timestamp, building, energy_usage, temperature, humidity, occupancy, renewable_energy)
        VALUES (?, ?, ?, ?, ?, ?, ?)''',
        (timestamp, data['building'], data['energy_usage'], data['temperature'], 
         data['humidity'], data['occupancy'], data['renewable_energy'])
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Energy data logged successfully!"}), 201

@app1.route('/energy_report', methods=['GET'])
def energy_report():
    """ Fetch energy usage reports from the database """
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM energy_log ORDER BY timestamp DESC LIMIT 10")
    records = cursor.fetchall()
    conn.close()

    report = [
        {"timestamp": r[1], "building": r[2], "energy_usage": r[3], "temperature": r[4], 
         "humidity": r[5], "occupancy": r[6], "renewable_energy": r[7]}
        for r in records
    ]

    return jsonify({"energy_report": report})

if __name__ == '__main__':
    app1.run(debug=True, port=5002)  # Running app1 on port 5002
