import React from "react";
import { AlertCircleIcon, ChevronRightIcon, ChevronDownIcon, ClockIcon } from "./Icons";

export default function KanbanView({ jobs, onSelectJob, onUpdateStatus }) {
  // Columns definition
  const columns = [
    { id: "scheduled", title: "Scheduled", dot: "bg-blue", border: "border-blue-lane" },
    { id: "in-progress", title: "In Progress", dot: "bg-cyan", border: "border-cyan-lane" },
    { id: "awaiting-parts", title: "Awaiting Parts", dot: "bg-amber", border: "border-amber-lane" },
    { id: "qa", title: "QA Verification", dot: "bg-purple", border: "border-purple-lane" },
    { id: "completed", title: "Completed", dot: "bg-emerald", border: "border-emerald-lane" },
  ];

  // Priority Styles mapping
  const priorityStyles = {
    urgent: { bg: "badge-urgent-bg", text: "badge-urgent-text", glow: "border-urgent" },
    high: { bg: "badge-high-bg", text: "badge-high-text", glow: "border-high" },
    medium: { bg: "badge-medium-bg", text: "badge-medium-text", glow: "border-medium" },
    low: { bg: "badge-low-bg", text: "badge-low-text", glow: "border-low" }
  };

  const getJobsByStatus = (status) => jobs.filter((job) => job.status === status);

  // Status transitions sequencing
  const statusSequence = ["scheduled", "in-progress", "awaiting-parts", "qa", "completed"];

  const handleMoveForward = (e, job) => {
    e.stopPropagation();
    const currentIndex = statusSequence.indexOf(job.status);
    if (currentIndex < statusSequence.length - 1) {
      onUpdateStatus(job.id, statusSequence[currentIndex + 1]);
    }
  };

  const handleMoveBackward = (e, job) => {
    e.stopPropagation();
    const currentIndex = statusSequence.indexOf(job.status);
    if (currentIndex > 0) {
      onUpdateStatus(job.id, statusSequence[currentIndex - 1]);
    }
  };

  return (
    <div className="kanban-view-container fade-in">
      <div className="kanban-board">
        {columns.map((column) => {
          const columnJobs = getJobsByStatus(column.id);
          return (
            <div key={column.id} className="kanban-column glassmorphic-panel">
              {/* Column Header */}
              <div className="kanban-column-header">
                <div className="kanban-column-title-group">
                  <span className={`kanban-status-dot ${column.dot}`}></span>
                  <h5>{column.title}</h5>
                </div>
                <span className="kanban-column-count">{columnJobs.length}</span>
              </div>

              {/* Column Content */}
              <div className={`kanban-column-body ${column.border}`}>
                {columnJobs.length > 0 ? (
                  columnJobs.map((job) => {
                    const styles = priorityStyles[job.priority] || priorityStyles.low;
                    const completedCheck = job.checklist.filter((c) => c.completed).length;
                    const totalCheck = job.checklist.length;
                    const progressPercent = totalCheck > 0 ? Math.round((completedCheck / totalCheck) * 100) : 0;

                    return (
                      <div
                        key={job.id}
                        className={`kanban-card glassmorphic-glow ${styles.glow}`}
                        onClick={() => onSelectJob(job)}
                      >
                        <div className="kanban-card-top">
                          <span className="kanban-card-id">{job.id}</span>
                          <span className={`priority-badge ${styles.bg} ${styles.text}`}>
                            {job.priority.toUpperCase()}
                          </span>
                        </div>

                        <h4 className="kanban-card-title">{job.title}</h4>
                        <span className="kanban-card-asset font-mono">{job.asset}</span>

                        {/* Small Checklist progress bar */}
                        <div className="kanban-progress-wrapper">
                          <div className="kanban-progress-header">
                            <span>Tasks</span>
                            <span>{completedCheck}/{totalCheck}</span>
                          </div>
                          <div className="kanban-progress-track">
                            <div
                              className="kanban-progress-fill"
                              style={{
                                width: `${progressPercent}%`,
                                backgroundColor: job.status === "completed" ? "var(--success-emerald)" : "var(--neon-cyan)"
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Card Footer with actions & technician */}
                        <div className="kanban-card-footer">
                          <div className="kanban-tech-info">
                            <img src={job.technician.avatar} alt={job.technician.name} className="kanban-tech-avatar" />
                            <span className="kanban-tech-name">{job.technician.name.split(" ")[0]}</span>
                          </div>

                          <div className="kanban-actions">
                            {job.status !== "scheduled" && (
                              <button
                                onClick={(e) => handleMoveBackward(e, job)}
                                className="kanban-nav-btn back-btn"
                                title="Demote Status"
                              >
                                ◀
                              </button>
                            )}
                            {job.status !== "completed" && (
                              <button
                                onClick={(e) => handleMoveForward(e, job)}
                                className="kanban-nav-btn forward-btn"
                                title="Promote Status"
                              >
                                ▶
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="kanban-empty-lane">No jobs in this stage.</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
