import React from "react";
import { SearchIcon, FilterIcon, ToolIcon, ClockIcon, AlertCircleIcon, EditIcon, TrashIcon } from "./Icons";

export default function GridView({
  jobs,
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  selectedTech,
  setSelectedTech,
  sortCriteria,
  setSortCriteria,
  onSelectJob,
  onEditJob,
  onDeleteJob,
  technicians
}) {

  // Filtration logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.asset.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus ? job.status === selectedStatus : true;
    const matchesPriority = selectedPriority ? job.priority === selectedPriority : true;
    const matchesTech = selectedTech ? job.technician.name === selectedTech : true;

    return matchesSearch && matchesStatus && matchesPriority && matchesTech;
  });

  // Sorting logic
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortCriteria === "id") {
      return a.id.localeCompare(b.id);
    }
    if (sortCriteria === "priority") {
      const priorityWeights = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityWeights[b.priority] - priorityWeights[a.priority];
    }
    if (sortCriteria === "progress") {
      const getProgress = (job) => {
        if (!job.checklist.length) return 0;
        const completed = job.checklist.filter(item => item.completed).length;
        return completed / job.checklist.length;
      };
      return getProgress(b) - getProgress(a);
    }
    if (sortCriteria === "cost") {
      const getCost = (job) => job.materials.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return getCost(b) - getCost(a);
    }
    return 0;
  });

  // Priority Styles mapping
  const priorityStyles = {
    urgent: { bg: "badge-urgent-bg", text: "badge-urgent-text", glow: "border-urgent" },
    high: { bg: "badge-high-bg", text: "badge-high-text", glow: "border-high" },
    medium: { bg: "badge-medium-bg", text: "badge-medium-text", glow: "border-medium" },
    low: { bg: "badge-low-bg", text: "badge-low-text", glow: "border-low" }
  };

  // Status Styles mapping
  const statusLabels = {
    "scheduled": { text: "Scheduled", color: "text-blue", dot: "bg-blue" },
    "in-progress": { text: "In Progress", color: "text-cyan", dot: "bg-cyan" },
    "awaiting-parts": { text: "Awaiting Parts", color: "text-amber", dot: "bg-amber" },
    "qa": { text: "QA Verification", color: "text-purple", dot: "bg-purple" },
    "completed": { text: "Completed", color: "text-emerald", dot: "bg-emerald" }
  };

  return (
    <div className="grid-view-container fade-in">
      {/* Search and Filters panel */}
      <div className="controls-panel glassmorphic-panel">
        <div className="search-bar-wrapper">
          <SearchIcon className="w-5 h-5 text-secondary" />
          <input
            type="text"
            placeholder="Search by Job ID, title, customer, or asset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-grid">
          <div className="filter-dropdown">
            <label className="filter-label"><FilterIcon className="w-3 h-3" /> Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="select-control"
            >
              <option value="">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="awaiting-parts">Awaiting Parts</option>
              <option value="qa">QA Verification</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="filter-dropdown">
            <label className="filter-label"><AlertCircleIcon className="w-3 h-3" /> Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="select-control"
            >
              <option value="">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="filter-dropdown">
            <label className="filter-label"><ToolIcon className="w-3 h-3" /> Technician</label>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="select-control"
            >
              <option value="">All Staff</option>
              {technicians.map((tech) => (
                <option key={tech.name} value={tech.name}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-dropdown">
            <label className="filter-label">Sort By</label>
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              className="select-control"
            >
              <option value="id">Job ID</option>
              <option value="priority">Priority</option>
              <option value="progress">Checklist Completion</option>
              <option value="cost">Materials Overhead</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid List */}
      {sortedJobs.length > 0 ? (
        <div className="cards-grid">
          {sortedJobs.map((job) => {
            const completedCheck = job.checklist.filter((c) => c.completed).length;
            const totalCheck = job.checklist.length;
            const progressPercent = totalCheck > 0 ? Math.round((completedCheck / totalCheck) * 100) : 0;
            const totalPartsCost = job.materials.reduce((sum, item) => sum + item.price * item.quantity, 0);
            
            const styles = priorityStyles[job.priority] || priorityStyles.low;
            const statusDetail = statusLabels[job.status] || { text: job.status, color: "text-secondary", dot: "bg-secondary" };

            return (
              <div key={job.id} className={`job-card glassmorphic-glow ${styles.glow} ${job.status === "completed" ? "completed-dim" : ""}`}>
                <div className="card-top">
                  <div className="card-identifiers">
                    <span className="card-job-id">{job.id}</span>
                    <span className={`priority-badge ${styles.bg} ${styles.text}`}>
                      {job.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="card-actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditJob(job);
                      }}
                      className="action-btn edit-btn"
                      title="Edit Job Card"
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteJob(job.id);
                      }}
                      className="action-btn delete-btn"
                      title="Delete Job Card"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="card-body" onClick={() => onSelectJob(job)}>
                  <h4 className="card-title">{job.title}</h4>
                  <div className="card-meta-row">
                    <span className="meta-label">Customer:</span>
                    <span className="meta-value">{job.customer}</span>
                  </div>
                  <div className="card-meta-row">
                    <span className="meta-label">Target Asset:</span>
                    <span className="meta-value font-mono">{job.asset}</span>
                  </div>

                  {/* Checklist progress bar */}
                  <div className="card-progress-section">
                    <div className="progress-text-row">
                      <span>Tasks Status</span>
                      <span className="progress-stats">{completedCheck}/{totalCheck} ({progressPercent}%)</span>
                    </div>
                    <div className="card-progress-track">
                      <div
                        className="card-progress-fill"
                        style={{ width: `${progressPercent}%`, backgroundColor: job.status === "completed" ? "var(--success-emerald)" : "var(--neon-cyan)" }}
                      ></div>
                    </div>
                  </div>

                  {/* Bottom details row */}
                  <div className="card-footer-row">
                    <div className="technician-avatar-tag">
                      <img src={job.technician.avatar} alt={job.technician.name} className="tech-avatar-mini" />
                      <div className="tech-avatar-info">
                        <span className="tech-name">{job.technician.name}</span>
                        <span className="tech-exp">{job.technician.expertise}</span>
                      </div>
                    </div>

                    <div className="card-footer-metrics">
                      <div className="footer-metric-pill" title="Materials Cost">
                        <span className="footer-metric-value">${totalPartsCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className={`status-pill ${statusDetail.color}`}>
                        <span className={`status-dot ${statusDetail.dot}`}></span>
                        {statusDetail.text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-results-panel glassmorphic-panel">
          <AlertCircleIcon className="w-12 h-12 text-secondary mb-4" />
          <h3>No matching job cards found</h3>
          <p>Try resetting filters or adjusting search queries to scan the system database.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedStatus("");
              setSelectedPriority("");
              setSelectedTech("");
            }}
            className="primary-btn btn-spacing-top"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
