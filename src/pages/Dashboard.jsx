// src/pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import MoodChart from "../components/MoodChart";
import { AuthContext } from "../context/AuthContext";
import { FaBrain, FaSmile, FaSpa, FaChartLine } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [moodHistory, setMoodHistory] = useState([]);
  const [meditationHistory, setMeditationHistory] = useState([]);
  const [chatCount, setChatCount] = useState(0); // 🟣 New state for AI sessions
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🟣 Fetch AI Chat count
  useEffect(() => {
    async function fetchChatCount() {
      if (!user?._id) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/chat/${user._id}`
        );
        const data = await res.json();
        setChatCount(data.totalChats || 0);
      } catch (error) {
        console.error("Error fetching chat count:", error);
        setChatCount(0);
      }
    }
    fetchChatCount();
  }, [user]);

  // Fetch moods
  useEffect(() => {
    async function fetchMoods() {
      if (!user) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/moods?userId=${user._id}`
        );
        const data = await res.json();
        setMoodHistory(Array.isArray(data) ? data : []);
      } catch {
        setMoodHistory([]);
      }
      setLoading(false);
    }
    fetchMoods();
  }, [user]);

  // Fetch meditations
  useEffect(() => {
    async function fetchMeditations() {
      if (!user) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/meditations/${user._id}`
        );
        const data = await res.json();
        setMeditationHistory(Array.isArray(data) ? data : []);
      } catch {
        setMeditationHistory([]);
      }
    }
    fetchMeditations();
  }, [user]);

  // Progress message (based on last 5 moods)
  const progressMessage = (() => {
    if (moodHistory.length < 2) return "Not enough data yet";
    const recent = moodHistory.slice(0, 5).map((m) => m.mood.toLowerCase());
    const happyCount = recent.filter((m) => m === "happy").length;
    const sadCount = recent.filter((m) => m === "sad").length;
    if (happyCount > sadCount) return "Improving mood trends";
    if (sadCount > happyCount) return "Mood needs attention";
    return "Stable mood trends";
  })();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-600 text-white py-8 px-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}!</h1>
        <p className="mt-2 text-purple-200">
          Here’s your mental wellness overview
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 mt-6">
        {/* 🟣 AI Sessions */}
        <Card className="flex items-center space-x-4 p-6 bg-white shadow-md hover:shadow-lg transition">
          <FaBrain className="text-purple-600 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">AI Sessions</h3>
            <p className="text-gray-600 mt-1">
              {chatCount} {chatCount === 1 ? "session" : "sessions"} completed
            </p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4 p-6 bg-white shadow-md hover:shadow-lg transition">
          <FaSmile className="text-blue-600 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Mood Logs</h3>
            <p className="text-gray-600 mt-1">
              {moodHistory.length} days tracked
            </p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4 p-6 bg-white shadow-md hover:shadow-lg transition">
          <FaSpa className="text-teal-600 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Meditations</h3>
            <p className="text-gray-600 mt-1">
              {meditationHistory.length} completed
            </p>
          </div>
        </Card>

        <Card className="flex items-center space-x-4 p-6 bg-white shadow-md hover:shadow-lg transition">
          <FaChartLine className="text-red-600 text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Progress</h3>
            <p className="text-gray-600 mt-1">{progressMessage}</p>
          </div>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="mt-10 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/ai-chat" className="block">
            <Card className="p-6 bg-purple-50 hover:bg-purple-100 cursor-pointer transition">
              <h3 className="text-lg font-semibold text-purple-700">
                Start AI Chat
              </h3>
              <p className="text-gray-600 mt-1">
                Talk to your AI companion now.
              </p>
            </Card>
          </Link>

          <Link to="/mood-tracker" className="block">
            <Card className="p-6 bg-blue-50 hover:bg-blue-100 cursor-pointer transition">
              <h3 className="text-lg font-semibold text-blue-700">Log Mood</h3>
              <p className="text-gray-600 mt-1">Record how you feel today.</p>
            </Card>
          </Link>

          <Link to="/meditations" className="block">
            <Card className="p-6 bg-teal-50 hover:bg-teal-100 cursor-pointer transition">
              <h3 className="text-lg font-semibold text-teal-700">
                Start Meditation
              </h3>
              <p className="text-gray-600 mt-1">Relax with guided sessions.</p>
            </Card>
          </Link>
        </div>
      </section>

      {/* Mood Progress Section */}
      <section className="mt-10 px-6 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Mood Progress
          </h2>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
            onClick={() => navigate("/mood-tracker")}
          >
            Log or View Moods
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? <p>Loading...</p> : <MoodChart moods={moodHistory} />}
        </div>
      </section>
    </div>
  );
}
