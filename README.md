# Smart-Water-Pressure-Management-System

**Team Name :** Icecubes  
**Team ID :** MITVPU_SAMVED_Team 420  
**Problem Statement :** Smart Water Pressure Management for Equitable Water Supply in Solapur Municipal Corporation 

## Dependencies / Requirements

The following dependencies are required to run the application:
- Python 3.8+ (Recommended)
- `Flask==3.0.0`
- `Flask-SocketIO==5.3.6`
- `pandas`
- `wntr`
- `eventlet`

Alternatively, you can install all dependencies at once using the provided `requirements.txt` file:
```bash
pip install -r requirements.txt
```

## Steps to run the system

The system consists of a backend SCADA simulation (`main_simulation.py`) and a web server (`app.py`). You can start them together using the provided batch file.

**On Windows (using the batch script):**
1. Open a terminal or command prompt in the project root directory.
2. Ensure you have installed all dependencies: 
   ```bash
   pip install -r requirements.txt
   ```
3. Run the batch file to initialize the entire application:
   ```cmd
   run.bat
   ```
4. Access the web dashboard by navigating to `http://127.0.0.1:5000` in your web browser. (Login with **Username:** `admin`, **Password:** `admin`)
5. Press any key in the command prompt to safely shut down both the simulation and the server.

**Manual Execution (All Platforms):**
If you are explicitly running the commands manually or are on a non-Windows OS:
1. Open a terminal and start the simulation:
   ```bash
   python main_simulation.py
   ```
2. Open a **second** terminal and start the Flask web application:
   ```bash
   python app.py
   ```
3. Access the web dashboard at `http://127.0.0.1:5000`. (Login with **Username:** `admin`, **Password:** `admin`)
