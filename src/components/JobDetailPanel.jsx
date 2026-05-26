import React from "react";
import { CloseIcon, PrintIcon, ClockIcon, DollarIcon, ToolIcon, AlertCircleIcon, CheckCircleIcon } from "./Icons";

export default function JobDetailPanel({ job, onClose, onToggleTask, onUpdateStatus }) {
  if (!job) return null;

  const totalPartsCost = job.materials.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const completedTasksCount = job.checklist.filter((t) => t.completed).length;
  const totalTasksCount = job.checklist.length;
  const progressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Handle printing
  const handlePrint = () => {
    window.print();
  };

  // Status Badge colors
  const statusColors = {
    "scheduled": "badge-scheduled-bg text-blue",
    "in-progress": "badge-progress-bg text-cyan",
    "awaiting-parts": "badge-parts-bg text-amber",
    "qa": "badge-qa-bg text-purple",
    "completed": "badge-completed-bg text-emerald"
  };

  return (
    <div className="detail-panel-overlay fade-in" onClick={onClose}>
      <div className="detail-panel-sheet slide-in" onClick={(e) => e.stopPropagation()}>
        {/* Printable Card Area */}
        <div className="printable-jobcard-area" id="printable-jobcard-section">
          {/* Details Header */}
          <div className="detail-panel-header">
            <div className="detail-header-identifiers">
              <span className="print-only-logo">AUTONITY CRYTO-LOGISTICS</span>
              <div className="detail-job-ref-group">
                <span className="detail-job-id">{job.id}</span>
                <span className="print-barcode">* {job.id} *</span>
              </div>
              <span className={`detail-status-badge ${statusColors[job.status] || "badge-low-bg text-secondary"}`}>
                {job.status.replace("-", " ").toUpperCase()}
              </span>
            </div>

            <div className="detail-header-actions no-print">
              <button onClick={handlePrint} className="secondary-btn flex-center" title="Print Job Card">
                <PrintIcon className="w-4 h-4 mr-2" /> Print Card
              </button>
              <button onClick={onClose} className="icon-close-btn" title="Close Panel">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="detail-title">{job.title}</h2>

          <div className="detail-body-scroller">
            {/* Quick Specs Grid */}
            <div className="detail-specs-grid">
              <div className="spec-card">
                <span className="spec-label">CLIENT OWNER</span>
                <span className="spec-val">{job.customer}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">ASSET UNDER TEST</span>
                <span className="spec-val font-mono">{job.asset}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">PRIORITY</span>
                <span className={`spec-val font-bold text-uppercase ${job.priority === 'urgent' ? 'text-urgent' : job.priority === 'high' ? 'text-high' : 'text-secondary'}`}>
                  {job.priority}
                </span>
              </div>
              <div className="spec-card">
                <span className="spec-label">STAKED MATERIALS VALUE</span>
                <span className="spec-val text-purple font-mono">${totalPartsCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Quick Status Transitions - No Print */}
            <div className="status-transitions-bar no-print">
              <span className="transition-label">Set Global State:</span>
              <div className="status-btns">
                {["scheduled", "in-progress", "awaiting-parts", "qa", "completed"].map((st) => (
                  <button
                    key={st}
                    onClick={() => onUpdateStatus(job.id, st)}
                    className={`status-transition-btn ${job.status === st ? 'active' : ''}`}
                  >
                    {st.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Technician Info */}
            <div className="detail-tech-section glassmorphic-panel">
              <img src={job.technician.avatar} alt={job.technician.name} className="tech-avatar-large" />
              <div className="tech-meta-details">
                <h5>{job.technician.name}</h5>
                <span className="tech-role">{job.technician.expertise}</span>
                <p className="tech-bio-note no-print">Assigned operator authorized for hardware cryptographic modifications on Autonity Core Protocols.</p>
              </div>
            </div>

            {/* Issue Notes */}
            <div className="detail-notes-section">
              <h4>Diagnostic Summary & Incident Report</h4>
              <p className="detail-notes-text">{job.notes}</p>
            </div>

            {/* Checklist Section */}
            <div className="detail-checklist-section">
              <div className="section-header-row">
                <h4>Mandatory Check-Sheet</h4>
                <span className="checklist-fraction font-mono">{completedTasksCount} / {totalTasksCount} tasks verified</span>
              </div>

              {/* Progress bar */}
              <div className="card-progress-track mb-4">
                <div className="card-progress-fill" style={{ width: `${progressPercent}%`, backgroundColor: "var(--neon-cyan)" }}></div>
              </div>

              <div className="checklist-items">
                {job.checklist.map((task) => (
                  <label key={task.id} className={`checklist-item-row ${task.completed ? 'task-done' : ''}`}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleTask(job.id, task.id)}
                      className="custom-checkbox no-print"
                    />
                    {/* Print check box representation */}
                    <span className="print-checkbox-indicator print-only">
                      {task.completed ? "[X]" : "[ ]"}
                    </span>
                    <span className="checklist-task-text">{task.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Materials & Invoicing Table */}
            <div className="detail-materials-section">
              <h4>Hardware Bill of Materials (BOM)</h4>
              <div className="table-responsive">
                <table className="materials-table">
                  <thead>
                    <tr>
                      <th>Material / Component</th>
                      <th className="text-right">Unit Price</th>
                      <th className="text-right">Quantity</th>
                      <th className="text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {job.materials.length > 0 ? (
                      job.materials.map((mat) => (
                        <tr key={mat.id}>
                          <td>{mat.name}</td>
                          <td className="text-right font-mono">${mat.price.toFixed(2)}</td>
                          <td className="text-right font-mono">{mat.quantity}</td>
                          <td className="text-right font-mono font-bold">${(mat.price * mat.quantity).toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-secondary py-3">No hardware components requested for this operation.</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="font-bold text-right py-2">Staked Materials Total:</td>
                      <td className="text-right font-mono font-bold text-purple py-2">${totalPartsCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Timeline Audit Logs */}
            <div className="detail-timeline-section">
              <h4>System-Generated Audit Trail</h4>
              <div className="audit-timeline-flow">
                {job.timeline.map((log, index) => (
                  <div key={index} className="timeline-flow-item">
                    <div className="flow-badge-dot"></div>
                    <div className="flow-item-details">
                      <div className="flow-header">
                        <span className="flow-action">{log.action}</span>
                        <span className="flow-time font-mono">
                          {new Date(log.time).toLocaleDateString("en-US")} {new Date(log.time).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <span className="flow-actor">Authorized Signature: {log.actor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Area (Print only) */}
            <div className="print-signature-area print-only">
              <div className="signature-block">
                <div className="signature-line"></div>
                <span>Assigned Technician Signature</span>
              </div>
              <div className="signature-block">
                <div className="signature-line"></div>
                <span>Validator Supervisor Signature</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
