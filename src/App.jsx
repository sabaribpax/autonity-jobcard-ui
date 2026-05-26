import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

// The refresh timer logic
const REFRESH_INTERVAL_SECONDS = 180; // 3 minutes
const API_URL = "/api/jobcards";

function getStatusConfig(statusStr) {
  if (!statusStr) return { label: 'UNKNOWN', class: 'status-draft' };
  
  const normalized = statusStr.trim().toLowerCase();
  if (normalized === 'draft') return { label: 'DRAFT', class: 'status-draft' };
  if (normalized === 'work in progress') return { label: 'WORK IN PROGRESS', class: 'status-wip' };
  if (normalized === 'assigned') return { label: 'ASSIGNED', class: 'status-assigned' };
  if (normalized === 'completed') return { label: 'COMPLETED', class: 'status-completed' };
  
  // Default fallback
  return { label: statusStr.toUpperCase(), class: 'status-draft' };
}

function App() {
  const [jobCards, setJobCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(REFRESH_INTERVAL_SECONDS);
  const containerRef = useRef(null);
  const scrollPosRef = useRef(0);
  const animationFrameIdRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const json = await response.json();
        if (json && json.data) {
          setJobCards(json.data);
        }
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 0) {
          // Time to refresh
          fetchData();
          return REFRESH_INTERVAL_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchData]);

  // Auto-scroll Effect
  useEffect(() => {
    const scrollSpeed = 0.8;

    const scroll = () => {
      if (!containerRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(scroll);
        return;
      }
      
      // If we don't have items, do nothing
      if (containerRef.current.scrollHeight === 0) {
        animationFrameIdRef.current = requestAnimationFrame(scroll);
        return;
      }

      scrollPosRef.current -= scrollSpeed;
      
      // When the first half has scrolled out of view, reset to top
      if (Math.abs(scrollPosRef.current) >= containerRef.current.scrollHeight / 2) {
        scrollPosRef.current = 0;
      }
      
      containerRef.current.style.transform = `translateY(${scrollPosRef.current}px)`;
      animationFrameIdRef.current = requestAnimationFrame(scroll);
    };

    animationFrameIdRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, [jobCards]); // Re-bind if DOM height significantly changes

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTimer = `Live Refresh: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const totalFleet = jobCards.length;
  // All statuses != Completed are considered Active
  const activeFleet = jobCards.filter(card => card.status && card.status.trim().toLowerCase() !== 'completed').length;

  // Duplicate rows for infinite scroll effect
  const displayRows = [...jobCards, ...jobCards].map((r, index) => ({
    ...r,
    _uniqueId: `${r.bike_reg_no}-${index}` // Ensure unique keys for duplicated rows
  }));

  return (
    <div className="app-wrapper">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <img 
              alt="Autonity Logo" 
              className="logo" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbq6JlcjuzVFfctGoIFu6iOKllAt5py6SKeRZTYWyMTz9oawwRBVOgP-mV8hUPd9hSWiqNVzd0zxj1R9ZJIRg1Zd8kHC_wi5szBm2CNd7huvyBz00pDaHsYYZO_X4Fsa4pHaEXEN1s0pCY_yoKBRttf_SqOYdlgzKOL6CuPdnQbo0QNg1x5hrZZuq59am70bi51rhFjh1GzqPC6wQnQn8jGtFzyprhkmm9eq0qEAh9Y25v5CeqVHu102gKRRX4UtQm5KPa21vprF9E"
            />
            <div>
              <h1 className="title">Live Fleet Tracker</h1>
            </div>
          </div>
          
          <div className="header-right">
            <div className="timer-badge">
              <span className="material-symbols-outlined timer-icon animate-spin">sync</span>
              <span className="timer-text">{displayTimer}</span>
            </div>
            
            <div className="stats-container">
              <div className="stat-box total">
                <span className="stat-label total">Total Fleet</span>
                <span className="stat-value total">{totalFleet}</span>
              </div>
              <div className="stat-box active">
                <span className="stat-label active">Active</span>
                <span className="stat-value active">{activeFleet}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="main-area">
        <div className="table-container">
          <div className="tv-header">
            <div className="th-cell">Bike No</div>
            <div className="th-cell">Customer</div>
            <div className="th-cell">Executive</div>
            <div className="th-cell">Status</div>
          </div>
          
          <div className="scroll-container">
            <div className="table-body" ref={containerRef}>
              {displayRows.map((row) => {
                const statusConfig = getStatusConfig(row.status);
                return (
                  <div key={row._uniqueId} className="tv-row">
                    <div className="td-cell td-bike">{row.bike_reg_no}</div>
                    <div className="td-cell td-customer">{row.customer}</div>
                    <div className="td-cell td-exec">{row.sales_executive}</div>
                    <div className="td-cell">
                      <span className={`status-badge ${statusConfig.class}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
