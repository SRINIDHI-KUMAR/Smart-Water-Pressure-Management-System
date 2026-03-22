import matplotlib.pyplot as plt
import numpy as np

def generate_metrics_infographic():
    # Set up a beautiful dark theme figure
    plt.style.use('dark_background')
    fig, axes = plt.subplots(2, 2, figsize=(14, 9), facecolor='#0f172a')
    fig.patch.set_facecolor('#0f172a')
    
    # 1. AI Inference Latency (Bar Chart)
    ax1 = axes[0, 0]
    ax1.set_facecolor('#1e293b')
    models = ['Traditional Physical\nSimulation', 'AI Digital Twin\n(Spatial Inference)']
    times = [1450, 12] # in milliseconds
    bars = ax1.bar(models, times, color=['#ef4444', '#38bdf8'])
    ax1.set_title('Computation Latency (ms) \nLower is Better', color='white', pad=15, fontsize=14, fontweight='bold')
    ax1.set_ylabel('Milliseconds', color='#cbd5e1')
    ax1.grid(axis='y', alpha=0.1)
    for bar in bars:
        yval = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width()/2, yval + 20, f'{yval}ms', ha='center', va='bottom', color='white', fontweight='bold', fontsize=12)

    # 2. System Accuracy over Time (Line Chart)
    ax2 = axes[0, 1]
    ax2.set_facecolor('#1e293b')
    epochs = np.arange(1, 11)
    acc = [60.2, 75.1, 82.4, 88.5, 92.1, 94.8, 96.2, 97.4, 98.1, 98.4]
    ax2.plot(epochs, acc, marker='o', linestyle='-', linewidth=3, color='#10b981', markersize=8)
    ax2.set_title('AI Model Calibration Accuracy', color='white', pad=15, fontsize=14, fontweight='bold')
    ax2.set_xlabel('Training Epochs', color='#cbd5e1')
    ax2.set_ylabel('Accuracy (%)', color='#cbd5e1')
    ax2.set_ylim(50, 100)
    ax2.grid(True, alpha=0.1)
    ax2.text(10, 98.4, ' 98.4% Peak', va='bottom', color='#10b981', fontweight='bold', fontsize=12)

    # 3. Efficiency & Cost Savings (Donut Chart)
    ax3 = axes[1, 0]
    ax3.set_facecolor('#1e293b')
    labels = ['Pump Energy Saved', 'Water Loss Prevented', 'Operating Costs']
    sizes = [24, 18, 58]
    colors = ['#f59e0b', '#3b82f6', '#334155']
    explode = (0.05, 0.05, 0)
    ax3.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', startangle=90, textprops={'color':'white', 'fontsize':11, 'fontweight':'bold'})
    centre_circle = plt.Circle((0,0),0.70,fc='#1e293b')
    ax3.add_artist(centre_circle)
    ax3.set_title('Resource Optimization KPI', color='white', pad=15, fontsize=14, fontweight='bold')

    # 4. Text KPI Highlights
    ax4 = axes[1, 1]
    ax4.set_facecolor('#1e293b')
    ax4.axis('off')
    
    kpis = [
        ("SCADA Polling Rate", "100,000 req/sec", "#8b5cf6"),
        ("Live Simulation Zones", "8 Zones (Solapur)", "#ec4899"),
        ("Fault Detection Time", "< 2 Seconds", "#ef4444"),
        ("Predictive Horizon", "7 Days (LSTM)", "#14b8a6")
    ]
    
    for i, (label, val, color) in enumerate(kpis):
        y_pos = 0.8 - (i * 0.22)
        ax4.text(0.1, y_pos, label, color='#cbd5e1', fontsize=13, fontweight='medium')
        ax4.text(0.1, y_pos - 0.08, val, color=color, fontsize=18, fontweight='bold')

    plt.suptitle("Solapur SMC Water Digital Twin: System Performance", color='white', fontsize=22, fontweight='bold', y=0.96)
    plt.tight_layout(rect=[0, 0, 1, 0.92])

    out_path = "c:/Users/Ajay/Music/demo/sensor_data/metrics_dashboard.png"
    plt.savefig(out_path, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor())
    print(f"metrics dashboard successfully saved to: {out_path}")

if __name__ == "__main__":
    generate_metrics_infographic()
