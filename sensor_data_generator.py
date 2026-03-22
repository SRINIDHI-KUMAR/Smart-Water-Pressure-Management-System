import random

def generate_sensor_readings(zid, z_data, scenario, s, tickCount):
    """
    Applies authentic hardware noise to CPHEEO baseline physics to 
    simulate raw IoT device strings.
    """
    # Baseline Physical Data
    base_flow = (z_data["pop"] * 135) / (24 * 60 * 60)
    pressure = 1.4 + random.uniform(-0.1, 0.2)
    flow = base_flow * random.uniform(0.8, 1.2)
    ph = 7.2 + random.uniform(-0.2, 0.2)
    
    # Hardware/Scenario Anomalies (Burst Pipes, Pumps Failing, etc.)
    if scenario == "P1" and zid in ["Z07", "Z03", "Z03"]:
        pressure = random.uniform(0.55, 0.85)
        flow = flow * 0.6
    elif scenario == "P2":
        if zid in ["Z01", "Z02"]:
            pressure = random.uniform(3.8, 4.2)
            flow = flow * 1.5
        elif zid in ["Z04", "Z06"]:
            pressure = random.uniform(0.9, 1.2)
            flow = flow * 0.4
    elif scenario == "P3" and zid in ["Z04", "Z06", "Z01"]:
        pressure = 1.4 + (tickCount % 5) * 0.2
        flow = flow * (1 + (tickCount % 5)*0.3)
    elif scenario == "P4" and zid in ["Z06", "Z08"]:
        pressure = max(0.4, 1.4 - 0.4)
        flow = flow + 12
    elif scenario == "P5":
        if zid == "Z04":
            pressure = random.uniform(0.2, 0.35)
            flow = 82.0 + random.uniform(0, 18)
        elif zid in ["Z01", "Z01"]:
            pressure = random.uniform(1.2, 1.3)
            flow = flow * 0.8
    elif scenario == "P6" and zid in ["Z08", "Z03"]:
        pressure = max(0.5, 1.4 - random.uniform(0.1, 0.3))
        flow = flow * 0.9
    elif scenario == "P7" and zid == "Z05":
        pressure = 1.4 + random.uniform(0, 0.2)
        flow = 48.0 + random.uniform(0, 10)
    elif scenario == "P8" and zid in ["Z01", "Z02"]:
        pressure = 4.8 + random.uniform(0, 0.4)
        flow = 35.0 + random.uniform(0, 8)
    elif scenario == "P9":
        pass # Normal
    elif scenario == "P10" and zid in ["Z04", "Z08"]:
        pressure = random.uniform(1.1, 1.3)
    elif scenario == "P11" and zid in ["Z01", "Z04", "Z02"]:
        pressure = 2.2 + random.uniform(0, 0.2)
        flow = 22.0 + random.uniform(0, 6)

    return flow, pressure, ph
