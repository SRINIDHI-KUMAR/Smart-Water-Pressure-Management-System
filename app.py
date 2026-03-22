from flask import Flask, render_template, request, jsonify # type: ignore
import threading
import os
import subprocess
import json

app = Flask(__name__)

SCENARIO_FILE = "current_scenario.txt"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/scenario", methods=["POST"])
def set_scenario():
    data = request.get_json()
    scenario_id = data.get("scenario", "NORMAL")
    print(f"Backend received scenario trigger: {scenario_id}")
    with open(SCENARIO_FILE, "w") as f:
        f.write(scenario_id)
    return jsonify({"status": "success", "active_scenario": scenario_id})

@app.route("/api/scada", methods=["GET"])
def get_scada():
    try:
        if os.path.exists("latest_state.json"):
            with open("latest_state.json", "r") as f:
                return jsonify(json.load(f))
    except Exception as e:
        print("Error reading state JSON:", e)
    return jsonify({"zoneState": {}, "newAlerts": []})

def run_scada():
    print("Starting SCADA Simulator...")
    subprocess.Popen(["python", "main_simulation.py"])

if __name__ == "__main__":
    os.makedirs("templates", exist_ok=True)
    with open(SCENARIO_FILE, "w") as f:
        f.write("NORMAL") # Reset on startup
        
    threading.Thread(target=run_scada, daemon=True).start()
    
    print("Starting Flask Web Server on http://127.0.0.1:5000")
    app.run(debug=False, port=5000, host="0.0.0.0")
