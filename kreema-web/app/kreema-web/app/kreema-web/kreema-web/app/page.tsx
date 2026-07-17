'use client';
import { useState } from 'react';

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const API_URL = "https://kreema-ai-production.up.railway.app";

  const launchAgent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/launch-agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, volume: 250000 })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert("Backend connection issue. Try again later.");
    }
    setLoading(false);
  };

  const joinWaitlist = () => {
    if (email) {
      alert(`✅ Welcome to KREEMA Waitlist! Early access + possible airdrop coming.`);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <nav className="border-b border-gray-800 p-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">KREEMA</h1>
        <div className="flex gap-8">
          <a href="#demo" className="hover:text-green-400">Demo</a>
          <a href="#token" className="hover:text-green-400">$KREEMA</a>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            The Railroad for<br />AI Agents
          </h1>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
            The End of Labor.<br />Let your KREEMA Agent become your employee.
          </p>
        </div>

        {/* Waitlist */}
        <div className="flex justify-center mb-16 gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="bg-zinc-900 border border-gray-700 px-8 py-4 rounded-2xl text-lg w-80"
          />
          <button onClick={joinWaitlist} className="bg-white text-black px-10 py-4 rounded-2xl font-semibold hover:bg-green-400">
            Join Waitlist
          </button>
        </div>

        {/* Demo */}
        <div id="demo" className="bg-zinc-900 rounded-3xl p-12">
          <h2 className="text-4xl font-semibold mb-8 text-center">Launch Your Agent</h2>
          
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Fitness coach personal brand"
            className="w-full bg-black border border-gray-700 px-8 py-6 rounded-2xl text-xl mb-8"
          />

          <button
            onClick={launchAgent}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-6 text-2xl font-bold rounded-3xl hover:brightness-110 disabled:opacity-70"
          >
            {loading ? "AGENTS WORKING..." : "🚀 LAUNCH KREEMA SYSTEM"}
          </button>

          {result && (
            <div className="mt-10 bg-black p-8 rounded-2xl text-sm overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </div>
          )}
        </div>

        {/* Token Section */}
        <div id="token" className="mt-20 text-center">
          <h3 className="text-3xl mb-4">$KREEMA Token</h3>
          <p className="text-green-400">Solana • 2% Ecosystem Fee • Coming Soon</p>
        </div>
      </main>
    </div>
  );
}
