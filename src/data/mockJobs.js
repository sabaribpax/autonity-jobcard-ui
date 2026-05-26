export const initialJobs = [
  {
    id: "ATN-8924",
    title: "Liquid Newton (LNTN) Oracle Node Diagnostics",
    customer: "Apex Derivatives Clearing Ltd.",
    asset: "Validator Cluster Node #4",
    priority: "urgent",
    status: "in-progress",
    technician: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      expertise: "Consensus Layer Specialist"
    },
    checklist: [
      { id: 1, text: "Verify BFT validator signature sync rates", completed: true },
      { id: 2, text: "Inspect HSM (Hardware Security Module) latency", completed: true },
      { id: 3, text: "Recalibrate protocol-native liquid staking feed", completed: false },
      { id: 4, text: "Run secure enclave hardware diagnostic", completed: false }
    ],
    materials: [
      { id: 1, name: "YubiKey 5 FIPS cryptographic key", quantity: 2, price: 95.00 },
      { id: 2, name: "SFP+ 10Gb Transceiver Module", quantity: 1, price: 45.00 },
      { id: 3, name: "Liquid Newton Protocol License Upgrade", quantity: 1, price: 350.00 }
    ],
    timeline: [
      { action: "Job Card Created", actor: "System Agent", time: "2026-05-25T08:00:00Z" },
      { action: "Technician Marcus Vance assigned", actor: "Supervisor", time: "2026-05-25T08:30:00Z" },
      { action: "BFT signature verification completed", actor: "Marcus Vance", time: "2026-05-25T10:15:00Z" },
      { action: "Status moved to In Progress", actor: "Marcus Vance", time: "2026-05-25T10:20:00Z" }
    ],
    notes: "Oracle feeds are showing occasional latency spikes above 200ms. Suspected micro-stuttering in HSM cryptographic handshakes. Need to update staking oracle node firmwares to v4.2.1."
  },
  {
    id: "ATN-3012",
    title: "Dual-Token Stabilization Engine Calibration",
    customer: "Elysium Quantitative Trading",
    asset: "ASM Engine B-3 (Stabilizer)",
    priority: "high",
    status: "scheduled",
    technician: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      expertise: "Tokenomics Engineer"
    },
    checklist: [
      { id: 1, text: "Benchmark gas pricing stabilization (Auton/ATN ratio)", completed: false },
      { id: 2, text: "Test Newton (NTN) liquid staking arbitrage path", completed: false },
      { id: 3, text: "Deploy stabilization smart contract hotfix v1.8", completed: false }
    ],
    materials: [
      { id: 1, name: "Optimized Gas Reserve Bond", quantity: 1, price: 1200.00 },
      { id: 2, name: "ASM Smart Contract Audit Fee", quantity: 1, price: 800.00 }
    ],
    timeline: [
      { action: "Job Card Created", actor: "System Agent", time: "2026-05-25T09:12:00Z" },
      { action: "Assigned to Elena Rostova", actor: "Lead Architect", time: "2026-05-25T09:45:00Z" }
    ],
    notes: "The Autonity Stabilization Mechanism (ASM) experienced a minor slippage anomaly under high derivatives clearing loads yesterday. Require comprehensive parameter adjustments."
  },
  {
    id: "ATN-7741",
    title: "100Gbps Backbone Fiber Port Installation",
    customer: "Antigravity Global Services",
    asset: "Core Switch Rack G7",
    priority: "medium",
    status: "awaiting-parts",
    technician: {
      name: "Darnell Jenkins",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      expertise: "Infrastructure Architect"
    },
    checklist: [
      { id: 1, text: "Decommission old 40Gbps QSFP interface card", completed: true },
      { id: 2, text: "Clean and test fiber optic endpoints", completed: false },
      { id: 3, text: "Install and mount 100Gbps high-performance transceiver", completed: false },
      { id: 4, text: "Run system-wide telemetry verification", completed: false }
    ],
    materials: [
      { id: 1, name: "Vite-Connect QSFP28 100G Transceiver", quantity: 1, price: 420.00 },
      { id: 2, name: "Fiber Cleaning Tool & Cassette", quantity: 2, price: 15.00 },
      { id: 3, name: "Custom Patch Cable LC-LC Duplex 3m", quantity: 2, price: 25.00 }
    ],
    timeline: [
      { action: "Job Card Created", actor: "Darnell Jenkins", time: "2026-05-24T14:20:00Z" },
      { action: "Decommission of 40Gbps complete", actor: "Darnell Jenkins", time: "2026-05-24T16:00:00Z" },
      { action: "Parts status changed to Awaiting Parts (QSFP28 out of stock)", actor: "Inventory", time: "2026-05-24T16:15:00Z" }
    ],
    notes: "Switch port has been offline. Awaiting custom low-latency transceiver shipment. Delivery scheduled for late afternoon. Port will be hot-swapped once delivered."
  },
  {
    id: "ATN-4491",
    title: "Tendermint BFT Consensus Version Upgrade",
    customer: "Vanguard Validator Syndicate",
    asset: "Tendermint Engine Suite V3",
    priority: "high",
    status: "qa",
    technician: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      expertise: "Consensus Layer Specialist"
    },
    checklist: [
      { id: 1, text: "Take snapshot of validator local database state", completed: true },
      { id: 2, text: "Stop validator service safely during low-block window", completed: true },
      { id: 3, text: "Compile Tendermint Core build v0.38.2 from source", completed: true },
      { id: 4, text: "Perform isolated cluster dry-run consensus check", completed: true },
      { id: 5, text: "Validate dual-token staking reward distribution logic", completed: false }
    ],
    materials: [
      { id: 1, name: "Database Backup Cloud Storage Unit", quantity: 1, price: 80.00 },
      { id: 2, name: "Consensus Simulation Cluster Hours", quantity: 10, price: 12.00 }
    ],
    timeline: [
      { action: "Job Card Created", actor: "System Alert", time: "2026-05-25T04:00:00Z" },
      { action: "Assigned to Marcus Vance", actor: "Supervisor", time: "2026-05-25T04:15:00Z" },
      { action: "State snapshot archived successfully", actor: "Marcus Vance", time: "2026-05-25T05:30:00Z" },
      { action: "Tendermint Core v0.38.2 successfully compiled", actor: "Marcus Vance", time: "2026-05-25T07:45:00Z" },
      { action: "Moved validator to QA for shadow consensus testing", actor: "Marcus Vance", time: "2026-05-25T08:15:00Z" }
    ],
    notes: "Validator is running in shadow mode on the testnet. No double-signing alerts detected. Performing final validations on liquid Newton contract adjustments before releasing node back to active pool."
  },
  {
    id: "ATN-1102",
    title: "Liquid Nitrogen Server-Rack Cooling Cycle Rebuild",
    customer: "Autonity Core Foundation",
    asset: "Ultra-Staking Supercluster S1",
    priority: "urgent",
    status: "completed",
    technician: {
      name: "Darnell Jenkins",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      expertise: "Infrastructure Architect"
    },
    checklist: [
      { id: 1, text: "Evacuate pressurized supercluster cooling manifold", completed: true },
      { id: 2, text: "Replace dual sub-ambient intake valves", completed: true },
      { id: 3, text: "Flush system with specialized cooling fluid", completed: true },
      { id: 4, text: "Pressurize system to standard operating 3.2 Bar", completed: true }
    ],
    materials: [
      { id: 1, name: "Sub-Ambient Cryogenic Valve Kit", quantity: 1, price: 490.00 },
      { id: 2, name: "Liquid Nitrogen Coolant Blend 50L", quantity: 2, price: 110.00 },
      { id: 3, name: "High-Pressure Viton Seal O-Ring Pack", quantity: 1, price: 35.00 }
    ],
    timeline: [
      { action: "Job Card Created", actor: "Supervisor", time: "2026-05-23T11:00:00Z" },
      { action: "Cryo manifold fully evacuated", actor: "Darnell Jenkins", time: "2026-05-23T12:30:00Z" },
      { action: "Valves and seals replaced", actor: "Darnell Jenkins", time: "2026-05-23T14:45:00Z" },
      { action: "Coolant flushed and system pressurized", actor: "Darnell Jenkins", time: "2026-05-23T16:00:00Z" },
      { action: "Cooling cycle rebuild verified, status set to Completed", actor: "QA Lead", time: "2026-05-23T17:30:00Z" }
    ],
    notes: "Supercluster temperatures are stable at a beautiful 14 Kelvin. Heat dispersal rates are well within green thresholds. All seals checked and verified under pressure."
  }
];

export const TECHNICIANS = [
  { name: "Marcus Vance", expertise: "Consensus Layer Specialist", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
  { name: "Elena Rostova", expertise: "Tokenomics Engineer", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
  { name: "Darnell Jenkins", expertise: "Infrastructure Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" }
];
