import os

# CPHEEO Standards Configuration
# Normal Pressure: 12m to 17m (1.2 to 1.7 bar)
# pH: 6.5 to 8.5 (ideal 7.0 - 7.5)
# Flow based on 135 LPCD

ZONES = [
  {"id":'Z01', "name":'Hotgi Road',      "hasSensor":True,  "pop":42000},
  {"id":'Z02', "name":'Akkalkot Road',   "hasSensor":True,  "pop":38000},
  {"id":'Z03', "name":'Bijapur Road',    "hasSensor":False, "pop":31000},
  {"id":'Z04', "name":'Station Area',    "hasSensor":True,  "pop":55000},
  {"id":'Z05', "name":'Mangalwar Peth',  "hasSensor":False, "pop":28000},
  {"id":'Z06', "name":'Budhwar Peth',    "hasSensor":True,  "pop":33000},
  {"id":'Z07', "name":'Shivaji Nagar',   "hasSensor":False, "pop":25000},
  {"id":'Z08', "name":'Osmanabad Road',  "hasSensor":True,  "pop":29000},
]

# File Paths
OUTPUT_FILE = "sensor_data/scada_live_data.csv"
SCENARIO_FILE = "current_scenario.txt"
STATE_FILE = "latest_state.json"

os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
