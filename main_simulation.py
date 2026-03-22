# type: ignore
import time
import os
import csv
import json
import random
import math
from datetime import datetime

# Import refactored modules
from config import ZONES, OUTPUT_FILE, SCENARIO_FILE, STATE_FILE # type: ignore
from epanet_hydraulic_model import get_baseline_hydraulics, calculate_loss # type: ignore
from sensor_data_generator import generate_sensor_readings # type: ignore
from ml_anomaly_detector import detect_anomalies # type: ignore
from model_calibration import calibrate_blind_zones  # type: ignore

print("🚀 Modular SCADA Pipeline with Explicit AI Calibration started...")
print("-> Streaming live outputs to dashboard JSON...")

def get_current_scenario():
    if not os.path.exists(SCENARIO_FILE):
        return "NORMAL"
    try:
        with open(SCENARIO_FILE, "r") as f:
            return f.read().strip()
    except:
        return "NORMAL"

# Initialize state structures
zone_state = get_baseline_hydraulics()
tickCount = 0

valve_states = { f"P{i:02d}": {"open": True, "position": 100} for i in range(1, 15) }
pump_states = {
    "PH01": {"running": True, "speed": 85.0},
    "PH02": {"running": True, "speed": 92.0},
    "PH03": {"running": True, "speed": 78.0}
}
tank_states = {
    "R01": 73.0, "R02": 61.0,
    "T01": 68.0, "T02": 82.0, "T03": 44.0
}

# Main Event Pipeline Loop
try:
    while True:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        scenario = get_current_scenario()
        rows = []
        new_alerts = []
        tickCount += 1
        
        # -----------------------------------------------------
        # PHASE 1: Hardware Sensor Generational Polling
        # -----------------------------------------------------
        for z in ZONES:
            zid = z["id"]
            s = zone_state[zid] # type: ignore
            
            # Persist delta history
            s["prevPressure"] = s["pressure"]
            s["prevFault"] = s["fault"]
            
            # Fetch TRUE physics-simulated noisy data IF device has a sensor
            if z["hasSensor"]:
                flow, pressure, ph = generate_sensor_readings(zid, z, scenario, s, tickCount)
                s["pressure"] = pressure
                s["flow"] = flow
                s["ph"] = ph

        # -----------------------------------------------------
        # PHASE 2: AI Model Callibration (Spatial Inference)
        # -----------------------------------------------------
        # Fills in the missing geographical data mathematically
        calibrate_blind_zones(zone_state, ZONES, timestamp)

        # -----------------------------------------------------
        # PHASE 3: Feature Eng. & ML Heuristic Detection Rules
        # -----------------------------------------------------
        for z in ZONES:
            zid = z["id"]
            s = zone_state[zid]
            
            s["loss"] = calculate_loss(zid, scenario, s)
            fault, status = detect_anomalies(scenario, zid, s)
            s["fault"] = fault
            s["status"] = status
            
            if fault and fault != s["prevFault"]:
                new_alerts.append({
                    "id": int(time.time() * 1000) + random.randint(1,100),
                    "zone": z["name"],
                    "zoneId": zid,
                    "type": fault,
                    "severity": status,
                    "time": timestamp,
                    "pressure": round(s["pressure"],2),
                    "flow": round(s["flow"],1),
                    "category": "RESIDENTIAL" # Mock category tag
                })
            
            rows.append([
                timestamp, zid, round(s["flow"], 2), round(s["pressure"], 2), round(s["ph"], 2), 
                status, fault, round(s["loss"], 1), s["aiInferred"], s["confidence"]
            ])

        # Write tabular CSV Output Log
        with open(OUTPUT_FILE, "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerows(rows)
            
        # Simulate active Mechanical variations
        for r in tank_states: tank_states[r] = max(10, min(100, tank_states[r] + random.uniform(-0.05, 0.05)))
        for p in pump_states: pump_states[p]["speed"] = max(50, min(100, pump_states[p]["speed"] + random.uniform(-0.5, 0.5)))
        
        system_stats = {
            "backupPower": round(84 + math.sin(tickCount*0.05)*5, 1),
            "dataAccuracy": round(94 + random.uniform(-1, 2), 1)
        }
        
        # Serialize the combined output package for Web JSON Consumption
        output_state = {
            "zoneState": zone_state,
            "valveStates": valve_states,
            "pumpStates": pump_states,
            "tankStates": tank_states,
            "systemStats": system_stats,
            "newAlerts": new_alerts
        }
        with open(STATE_FILE, "w") as f:
            json.dump(output_state, f)

        print(f"--- Pipeline Tick {tickCount} Completed ---")
        time.sleep(2)
        
except KeyboardInterrupt:
    print("Modular SCADA simulation safely stopped.")
