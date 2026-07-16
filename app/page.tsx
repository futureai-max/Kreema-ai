export const dynamic = "force-dynamic";
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Connecting...");
  const [project, setProject] = useState("");
  const [idea, setIdea] = useState("");
  const [launchMessage, setLaunchMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://railway.app";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setProject(data.project);
      })
      .catch(() => setStatus("Offline"));
  }, [API_URL]);

  const handleLaunchAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea) return alert("Please enter an agent idea first!");
    
    setLoading(true);
    setLaunchMessage("Launching autonomous agent core...");

    try {
      const res = await fetch(`${API_URL}/launch-agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, volume: 250000 })
      });
      
      const data = await res.json();
      setLaunchMessage(`Success: ${JSON.stringify(data)}`);
    } catch (error) {
      setLaunchMessage("Failed to connect to backend endpoint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#0b0f19", color: "#fff", fontFamily: "sans-serif", padding: "20px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#a855f7" }}>Kreema AI Control Panel</h1>
      
      <div style={{ padding: "1.5rem", borderRadius: "12px", backgroundColor: "#161b26", border: "1px solid #2d3748", textAlign: "center", minWidth: "350px", marginBottom: "2rem" }}>
        <p style={{ margin: "0.5rem 0" }}>Backend Core Status: <span style={{ color: status === "healthy" ? "#10b981" : "#ef4444", fontWeight: "bold" }}>{status.toUpperCase()}</span></p>
        {project && <p style={{ margin: "0.5rem 0", color: "#9ca3af", fontSize: "0.9rem" }}>Project Identity: {project}</p>}
      </div>

      <form onSubmit={handleLaunchAgent} style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "400px", padding: "2rem", borderRadius: "12px", backgroundColor: "#161b26", border: "1px solid #2d3748" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#a855f7" }}>Deploy Autonomous Agent</h2>
        
        <label style={{ marginBottom: "0.5rem", color: "#9ca3af", fontSize: "0.9rem" }}>Agent Deployment Strategy / Idea</label>
        <input 
          type="text" 
          value={idea} 
          onChange={(e) => setIdea(e.target.value)} 
          placeholder="e.g., Scan high-velocity liquidity pools" 
          style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid #4a5568", backgroundColor: "#1f2937", color: "#fff", marginBottom: "1rem", outline: "none" }}
        />

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: "0.75rem", borderRadius: "6px", border: "none", backgroundColor: loading ? "#4a5568" : "#a855f7", color: "#fff", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", transition: "0.2s" }}
        >
          {loading ? "Processing..." : "Launch Agent"}
        </button>

        {launchMessage && (
          <p style={{ marginTop: "1rem", padding: "0.75rem", borderRadius: "6px", backgroundColor: "#1f2937", fontSize: "0.85rem", color: "#cbd5e1", borderLeft: "4px solid #a855f7", wordBreak: "break-all" }}>
            {launchMessage}
          </p>
        )}
      </form>
    </div>
  );
}
// force redeploy update
