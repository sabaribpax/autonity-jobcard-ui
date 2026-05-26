import React, { useState, useEffect } from "react";
import { CloseIcon, PlusIcon, TrashIcon } from "./Icons";

export default function JobFormModal({ job, onClose, onSave, technicians }) {
  // Pre-assigned values or defaults
  const [title, setTitle] = useState("");
  const [customer, setCustomer] = useState("");
  const [asset, setAsset] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("scheduled");
  const [technicianName, setTechnicianName] = useState("");
  const [notes, setNotes] = useState("");

  // Dynamic Array States
  const [checklist, setChecklist] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [materials, setMaterials] = useState([]);
  const [newMaterialName, setNewMaterialName] = useState("");
  const [newMaterialPrice, setNewMaterialPrice] = useState("");
  const [newMaterialQty, setNewMaterialQty] = useState(1);

  // Load existing job details if editing
  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setCustomer(job.customer);
      setAsset(job.asset);
      setPriority(job.priority);
      setStatus(job.status);
      setTechnicianName(job.technician.name);
      setNotes(job.notes);
      setChecklist(job.checklist);
      setMaterials(job.materials);
    } else {
      // Default to first technician
      if (technicians && technicians.length > 0) {
        setTechnicianName(technicians[0].name);
      }
    }
  }, [job, technicians]);

  // Checklist Helpers
  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    const newItem = {
      id: checklist.length > 0 ? Math.max(...checklist.map(c => c.id)) + 1 : 1,
      text: newChecklistItem.trim(),
      completed: false
    };
    setChecklist([...checklist, newItem]);
    setNewChecklistItem("");
  };

  const removeChecklistItem = (id) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  // Materials Helpers
  const addMaterialItem = () => {
    if (!newMaterialName.trim() || !newMaterialPrice) return;
    const priceFloat = parseFloat(newMaterialPrice);
    if (isNaN(priceFloat) || priceFloat < 0) return;

    const newItem = {
      id: materials.length > 0 ? Math.max(...materials.map(m => m.id)) + 1 : 1,
      name: newMaterialName.trim(),
      price: priceFloat,
      quantity: parseInt(newMaterialQty) || 1
    };
    setMaterials([...materials, newItem]);
    setNewMaterialName("");
    setNewMaterialPrice("");
    setNewMaterialQty(1);
  };

  const removeMaterialItem = (id) => {
    setMaterials(materials.filter(item => item.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !customer.trim() || !asset.trim()) {
      alert("Please fill in all mandatory fields: Title, Client, and Target Asset.");
      return;
    }

    const selectedTechObj = technicians.find((t) => t.name === technicianName) || technicians[0];

    const jobData = {
      id: job ? job.id : `ATN-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title.trim(),
      customer: customer.trim(),
      asset: asset.trim(),
      priority,
      status,
      technician: {
        name: selectedTechObj.name,
        avatar: selectedTechObj.avatar,
        expertise: selectedTechObj.expertise
      },
      checklist,
      materials,
      notes: notes.trim(),
      // Add creation audit trace if a new card
      timeline: job
        ? job.timeline
        : [
            {
              action: "Job Card Initialized",
              actor: "System Administrator",
              time: new Date().toISOString()
            }
          ]
    };

    onSave(jobData);
  };

  return (
    <div className="modal-overlay fade-in" onClick={onClose}>
      <div className="modal-content glassmorphic-panel slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{job ? `Modify Job Specs: ${job.id}` : "Initialize Operational Job Card"}</h3>
          <button onClick={onClose} className="icon-close-btn" title="Close Modal">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-body">
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Job Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Validator Node Staking System Diagnostics"
                className="form-control-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Client / Customer *</label>
              <input
                type="text"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="e.g. Apex Cleared Quant Funds"
                className="form-control-input"
                required
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Target Asset/Device *</label>
              <input
                type="text"
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                placeholder="e.g. Core Switch G7"
                className="form-control-input font-mono"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assign Technician</label>
              <select
                value={technicianName}
                onChange={(e) => setTechnicianName(e.target.value)}
                className="select-control"
              >
                {technicians.map((t) => (
                  <option key={t.name} value={t.name}>
                    {t.name} ({t.expertise.split(" ")[0]})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group font-grid-sub3">
              <div className="form-sub-2">
                <div className="form-sub-group">
                  <label className="form-label">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="select-control"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="form-sub-group">
                  <label className="form-label">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="select-control"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="awaiting-parts">Awaiting Parts</option>
                    <option value="qa">QA Verification</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Incident Log / Diagnostic Summary</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide a summary of anomalies, logs, or specific hardware requests details..."
              rows="3"
              className="form-control-textarea"
            ></textarea>
          </div>

          <hr className="form-separator" />

          {/* Dynamic Checklists */}
          <div className="form-dynamic-section">
            <h4>Operative Tasks Checklist</h4>
            <div className="dynamic-input-row">
              <input
                type="text"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                placeholder="Add checklist subtask..."
                className="form-control-input flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChecklistItem();
                  }
                }}
              />
              <button type="button" onClick={addChecklistItem} className="secondary-btn flex-center">
                <PlusIcon className="w-4 h-4 mr-1" /> Add Task
              </button>
            </div>

            {checklist.length > 0 && (
              <div className="dynamic-items-list">
                {checklist.map((item) => (
                  <div key={item.id} className="dynamic-list-item flex-between">
                    <span className="checklist-preview-text font-mono">{item.text}</span>
                    <button
                      type="button"
                      onClick={() => removeChecklistItem(item.id)}
                      className="icon-only-trash"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr className="form-separator" />

          {/* Dynamic Materials */}
          <div className="form-dynamic-section">
            <h4>Materials Ledger & Components</h4>
            <div className="dynamic-input-row-3">
              <input
                type="text"
                value={newMaterialName}
                onChange={(e) => setNewMaterialName(e.target.value)}
                placeholder="Component description..."
                className="form-control-input flex-2"
              />
              <input
                type="number"
                value={newMaterialPrice}
                onChange={(e) => setNewMaterialPrice(e.target.value)}
                placeholder="Unit Price $"
                step="0.01"
                min="0"
                className="form-control-input flex-1"
              />
              <input
                type="number"
                value={newMaterialQty}
                onChange={(e) => setNewMaterialQty(e.target.value)}
                placeholder="Qty"
                min="1"
                className="form-control-input qty-input"
              />
              <button type="button" onClick={addMaterialItem} className="secondary-btn flex-center">
                <PlusIcon className="w-4 h-4 mr-1" /> Add Part
              </button>
            </div>

            {materials.length > 0 && (
              <div className="dynamic-items-list font-mono">
                {materials.map((mat) => (
                  <div key={mat.id} className="dynamic-list-item flex-between">
                    <span>
                      {mat.name} - ${mat.price.toFixed(2)} x {mat.quantity} (Total: ${(mat.price * mat.quantity).toFixed(2)})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeMaterialItem(mat.id)}
                      className="icon-only-trash"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">
              Discard
            </button>
            <button type="submit" className="primary-btn">
              {job ? "Save Diagnostics" : "Deploy Job Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
