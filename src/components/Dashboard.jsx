import React from "react";
import { ClockIcon, DollarIcon, CheckCircleIcon, ToolIcon, AlertCircleIcon } from "./Icons";

export default function Dashboard({ jobs }) {
  // Statistics Calculations
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter((j) => j.status === "completed").length;
  const inProgressJobs = jobs.filter((j) => j.status === "in-progress").length;
  const awaitingPartsJobs = jobs.filter((j) => j.status === "awaiting-parts").length;
  const urgentJobs = jobs.filter((j) => j.priority === "urgent" && j.status !== "completed").length;

  const totalCost = jobs.reduce((acc, job) => {
    const jobPartsCost = job.materials.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return acc + jobPartsCost;
  }, 0);

  // Active Rate
  const completionPercentage = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

  // Flatten and sort recent timelines for the activity log
  const allActivities = jobs
    .flatMap((job) =>
      job.timeline.map((t) => ({
        ...t,
        jobId: job.id,
        jobTitle: job.title,
      }))
    )
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5);

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-grid">
        {/* KPI 1: Active Workload */}
        <div className="kpi-card glassmorphic-glow cyan">
          <div className="kpi-icon-wrapper">
            <ToolIcon className="w-6 h-6 text-cyan" />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Active Workload</span>
            <h3 className="kpi-value">{inProgressJobs} <span className="kpi-subtext">in progress</span></h3>
            <div className="kpi-progress-track">
              <div className="kpi-progress-bar bg-cyan" style={{ width: `${(inProgressJobs / totalJobs) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* KPI 2: Completed Jobs */}
        <div className="kpi-card glassmorphic-glow emerald">
          <div className="kpi-icon-wrapper">
            <CheckCircleIcon className="w-6 h-6 text-emerald" />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Completed Systems</span>
            <h3 className="kpi-value">{completedJobs} / {totalJobs}</h3>
            <div className="kpi-progress-track">
              <div className="kpi-progress-bar bg-emerald" style={{ width: `${completionPercentage}%` }}></div>
            </div>
            <span className="kpi-delta-tag text-emerald">+{completionPercentage}% efficiency rate</span>
          </div>
        </div>

        {/* KPI 3: Urgent Operations */}
        <div className="kpi-card glassmorphic-glow amber">
          <div className="kpi-icon-wrapper">
            <AlertCircleIcon className="w-6 h-6 text-amber" />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Critical Alerts</span>
            <h3 className="kpi-value">{urgentJobs} <span className="kpi-subtext">active urgent</span></h3>
            <div className="kpi-progress-track">
              <div className="kpi-progress-bar bg-amber" style={{ width: `${(urgentJobs / totalJobs) * 100}%` }}></div>
            </div>
            <span className="kpi-delta-tag text-amber">Immediate response required</span>
          </div>
        </div>

        {/* KPI 4: Financial Overhead */}
        <div className="kpi-card glassmorphic-glow purple">
          <div className="kpi-icon-wrapper">
            <DollarIcon className="w-6 h-6 text-purple" />
          </div>
          <div className="kpi-data">
            <span className="kpi-label">Staked Materials Asset</span>
            <h3 className="kpi-value">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            <div className="kpi-progress-track">
              <div className="kpi-progress-bar bg-purple" style={{ width: "70%" }}></div>
            </div>
            <span className="kpi-delta-tag text-purple">Resource allocation optimal</span>
          </div>
        </div>
      </div>

      <div className="analytics-section">
        {/* Charts & Graphs Panel */}
        <div className="chart-panel glassmorphic-panel">
          <div className="panel-header">
            <h4>Autonity Node Workload & Telemetry</h4>
            <span className="telemetry-live-dot">Live Feed</span>
          </div>
          <div className="chart-wrapper">
            <svg viewBox="0 0 500 200" className="telemetry-chart">
              <defs>
                <linearGradient id="cyan-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--neon-cyan)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="purple-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--electric-purple)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--electric-purple)" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="var(--border-color)" strokeDasharray="5,5" strokeWidth="0.5" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="var(--border-color)" strokeDasharray="5,5" strokeWidth="0.5" />
              <line x1="0" y1="160" x2="500" y2="160" stroke="var(--border-color)" strokeDasharray="5,5" strokeWidth="0.5" />

              {/* Chart Line 1: Node Staking Latency */}
              <path
                d="M 0 160 Q 50 140 100 120 T 200 90 T 300 130 T 400 60 T 500 40 L 500 200 L 0 200 Z"
                fill="url(#cyan-gradient)"
              />
              <path
                d="M 0 160 Q 50 140 100 120 T 200 90 T 300 130 T 400 60 T 500 40"
                fill="none"
                stroke="var(--neon-cyan)"
                strokeWidth="3"
                className="animated-path"
              />

              {/* Chart Line 2: Derivative Transacting Overhead */}
              <path
                d="M 0 180 Q 50 160 100 170 T 200 140 T 300 110 T 400 120 T 500 80 L 500 200 L 0 200 Z"
                fill="url(#purple-gradient)"
              />
              <path
                d="M 0 180 Q 50 160 100 170 T 200 140 T 300 110 T 400 120 T 500 80"
                fill="none"
                stroke="var(--electric-purple)"
                strokeWidth="2"
                strokeDasharray="4,2"
              />

              {/* Data Points */}
              <circle cx="100" cy="120" r="4" fill="var(--neon-cyan)" className="pulse-dot" />
              <circle cx="300" cy="130" r="4" fill="var(--neon-cyan)" className="pulse-dot" />
              <circle cx="400" cy="60" r="4" fill="var(--neon-cyan)" className="pulse-dot" />
            </svg>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-indicator bg-cyan"></span>Consensus Layer Processing (ATN)</span>
              <span className="legend-item"><span className="legend-indicator bg-purple border-dashed"></span>Derivative Clearing Volume (NTN)</span>
            </div>
          </div>
        </div>

        {/* Activity & Log Feed */}
        <div className="activity-panel glassmorphic-panel">
          <div className="panel-header">
            <h4>Live Auditing Log Feed</h4>
            <ClockIcon className="w-4 h-4 text-secondary" />
          </div>
          <div className="activity-list">
            {allActivities.length > 0 ? (
              allActivities.map((act, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-marker-wrapper">
                    <div className="activity-marker-dot"></div>
                    {index !== allActivities.length - 1 && <div className="activity-marker-line"></div>}
                  </div>
                  <div className="activity-details">
                    <span className="activity-timestamp">
                      {new Date(act.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <p className="activity-description">
                      <strong>{act.actor}</strong>: {act.action}
                    </p>
                    <span className="activity-job-ref">{act.jobId} - {act.jobTitle}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activity">No system events logged in this batch session.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
