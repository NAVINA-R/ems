from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Student database
students = {"123": "Alice", "456": "Bob", "789": "Charlie", "101": "David"}

# Tracking variables
occupancy_count = 0
entry_log = {}
attendance_log = set()

@app.route('/scan_qr', methods=['POST'])
def scan_qr():
    global occupancy_count
    data = request.get_json()
    student_id = data.get("student_id")

    if student_id and student_id in students:
        if student_id not in entry_log:
            # Mark entry
            entry_log[student_id] = 1
            occupancy_count += 1
            attendance_log.add(student_id)
            message = f"{students[student_id]} entered. Occupancy: {occupancy_count}"
        else:
            # Mark exit
            entry_log.pop(student_id)
            occupancy_count -= 1
            message = f"{students[student_id]} exited. Occupancy: {occupancy_count}"

        return jsonify({"message": message})
    
    return jsonify({"message": "Invalid QR Code"}), 400

if __name__ == '__main__':
    app.run(debug=True)
