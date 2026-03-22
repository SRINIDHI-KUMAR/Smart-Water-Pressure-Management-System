@echo off
echo --- SMC Smart Water Digital Twin Backend ---

start /b python main_simulation.py

start /b python app.py

echo.
echo The Application is now Initialized.
echo SCADA Simulation running purely in Python Backend.
echo Check the Web Interface at http://127.0.0.1:5000
echo --------------------------------------------
echo Press any key to shutdown the system.
pause >nul
taskkill /F /IM python.exe
