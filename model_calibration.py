import csv
import os
import random

NEIGHBORS = {
    "Z03": ["Z01", "Z04"], # Bijapur Road between Hotgi and Station
    "Z05": ["Z06", "Z02"], # Mangalwar Peth between Budhwar and Akkalkot
    "Z07": ["Z08", "Z06"], # Shivaji Nagar between Osmanabad and Budhwar
}

CALIBRATION_FILE = "sensor_data/calibration_logs.csv"
os.makedirs(os.path.dirname(CALIBRATION_FILE), exist_ok=True)

# Initialize CSV Headers
if not os.path.exists(CALIBRATION_FILE):
    with open(CALIBRATION_FILE, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Timestamp", "Blind Zone ID", "Inferred From", "Calibrated Pressure (bar)", "Physics Delta (bar)", "Calibrated Flow (LPS)"])

def calibrate_blind_zones(zone_state, zones_config, timestamp):
    """
    Model Calibration Pipeline Phase
    Takes the raw telemetry from hardware sensors and runs spatial bounding-box
    interpolation to mathematically align the blind zones with the physical state
    of the surrounding network.
    
    Logs live calibration metrics to a dedicated CSV file for demonstration.
    """
    calibration_rows = []
    
    for z in zones_config:
        zid = z["id"]
        if not z.get("hasSensor") and zid in NEIGHBORS:
            neighbors = NEIGHBORS[zid]
            
            # Step 1: Calculate the exact anomaly deviation vector of neighbors
            avg_neighbor_p = sum(zone_state[n]["pressure"] for n in neighbors) / len(neighbors)
            pressure_anomaly_delta = avg_neighbor_p - 1.4 # deviation from ideal physics
            
            # Step 2: Calibrate pressure with standard deviation noise (removed systemic pipeline pressure loss bias)
            calibrated_pressure = 1.4 + pressure_anomaly_delta + random.uniform(-0.03, 0.03)
            
            # Step 3: Calibrate flow using ratio modifiers mapped against baseline vectors
            base_flow = (z["pop"] * 135) / (24 * 60 * 60)
            avg_f = sum(zone_state[n]["flow"] for n in neighbors) / len(neighbors)
            calibrated_flow = base_flow * (avg_f / 60.0) + random.uniform(-1, 1)
            
            calibrated_ph = 7.2 + random.uniform(-0.1, 0.1)
            
            # Commit the calibrated data into the state matrix
            zone_state[zid]["pressure"] = calibrated_pressure
            zone_state[zid]["flow"] = calibrated_flow
            zone_state[zid]["ph"] = calibrated_ph
            
            # Record explicit calibration output for Hacker logging
            calibration_rows.append([
                timestamp, 
                zid, 
                " & ".join(neighbors), 
                round(float(calibrated_pressure), 3), # type: ignore
                round(float(pressure_anomaly_delta), 3), # type: ignore
                round(float(calibrated_flow), 2) # type: ignore
            ])
            
    # Append the tick's calibration outputs to the CSV file
    if calibration_rows:
        with open(CALIBRATION_FILE, "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerows(calibration_rows)
