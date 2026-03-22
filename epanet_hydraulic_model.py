import random
from config import ZONES # type: ignore

def get_baseline_hydraulics():
    """Calculates the pure CPHEEO standard hydraulic baseline for all zones."""
    zone_state = {}
    for z in ZONES:
        base_flow = (z["pop"] * 135) / (24 * 60 * 60) # LPS average
        zone_state[z["id"]] = {
            "pressure": 1.4 + random.uniform(-0.1, 0.2), # CPHEEO 1.2-1.7
            "flow": base_flow * random.uniform(0.8, 1.2),
            "ph": 7.2 + random.uniform(-0.2, 0.2),
            "status": "NORMAL",
            "fault": None,
            "prevPressure": 1.4,
            "prevFault": None,
            "loss": 4.0 + random.uniform(-1, 2),
            "aiInferred": not z['hasSensor'],
            "confidence": 100 if z['hasSensor'] else random.randint(88, 95)
        }
    return zone_state

def calculate_loss(zid, scenario, s):
    """Calculates estimated water-loss percentages based on pressure anomalies."""
    base = 3.0
    if s["pressure"] < 1.0: base += 7
    if s["flow"] > 40: base += 12
    if scenario == 'P4' and zid in ['Z06','Z08']: base += 22
    if scenario == 'P5' and zid == 'Z04': base += 50
    if scenario == 'P6' and zid in ['Z08','Z03']: base += 18
    if scenario == 'P7' and zid == 'Z05': base += 5
    return min(85.0, base + random.uniform(0, 3))
