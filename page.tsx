"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Connecting to backend...");
  const [project, setProject] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://railway.app";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setProject(data.project);
      })
      .catch(() => setStatus("Offline"));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#0b0f19", color: "#fff", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#a855f7" }}>Kreema AI Control Panel</h1>
      <div style={{ padding: "1.5rem", borderRadius: "12px", backgroundColor: "#161b26", border: "1px solid #2d3748", textAlign: "center", minWidth: "300px" }}>
        <p style={{ margin: "0.5rem 0", fontSize: "1.1rem" }}>Backend Core Status: <span style={{ color: status === "healthy" ? "#10b981" : "#ef4444", fontWeight: "bold" }}>{status.toUpperCase()}</span></p>
        {project && <p style={{ margin: "0.5rem 0", color: "#9ca3af" }}>Project Core Identifier: {project}</p>}
      </div>
    </div>
  );
}
