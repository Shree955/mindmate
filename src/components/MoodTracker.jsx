import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const moods = [
  { label: "Happy", emoji: "😄" },
  { label: "Good", emoji: "😊" },
  { label: "Neutral", emoji: "😐" },
  { label: "Sad", emoji: "😢" },
  { label: "Angry", emoji: "😡" },
];

export default function MoodTracker() {
  const { user } = useContext(AuthContext);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); // <-- added here

  const fetchMoods = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/moods?userId=${user._id}`
      );
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch {
      setHistory([]);
    }
    setLoading(false);
  };

  const handleAddMood = async () => {
    if (!selectedMood) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/moods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          mood: selectedMood.emoji + " " + selectedMood.label,
          note,
        }),
      });
      if (!res.ok) throw new Error();
      setSelectedMood(null);
      setNote("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1800);
      await fetchMoods();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Failed to save your mood.");
    }
  };

  useEffect(() => {
    if (user) fetchMoods();
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-2 text-purple-900">
        Mood Tracker
      </h2>
      <p className="mb-4 text-gray-500">
        Pick your mood and leave a note to reflect on your day.
      </p>

      {/* Animated feedback */}
      {success && (
        <div className="flex items-center mb-4 text-green-600 transition">
          <FaCheckCircle className="mr-1" /> Mood logged!
        </div>
      )}

      {/* Mood selection */}
      <div className="flex flex-wrap gap-3 mb-3">
        {moods.map((mood) => (
          <button
            key={mood.label}
            type="button"
            title={mood.label}
            onClick={() => setSelectedMood(mood)}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 text-xl font-bold 
              ${
                selectedMood?.label === mood.label
                  ? "bg-purple-600 text-white border-purple-600 scale-105 shadow"
                  : "bg-white hover:bg-purple-50 border-purple-200"
              } transition focus:outline-none`}
          >
            <span>{mood.emoji}</span>
            <span className="text-xs font-normal">{mood.label}</span>
          </button>
        ))}
      </div>

      {/* Note input */}
      <textarea
        placeholder="How are you feeling? (Optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-3 border-2 border-purple-100 rounded-lg mb-3 transition focus:border-purple-400"
      />

      {/* Add mood button */}
      <button
        onClick={handleAddMood}
        disabled={!selectedMood}
        className={`py-2 px-8 rounded-lg text-lg font-bold w-full transition
          ${
            selectedMood
              ? "bg-purple-600 text-white hover:bg-purple-700 shadow"
              : "bg-purple-200 text-purple-400 cursor-not-allowed"
          }`}
      >
        Add Mood
      </button>

      {/* Go to Dashboard button */}

      {/* History */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2 text-purple-800">Recent Moods</h3>
        {loading ? (
          <p className="text-purple-500">Loading history...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-400">No moods logged yet.</p>
        ) : (
          <div className="grid gap-2">
            {history.slice(0, 7).map((h) => (
              <div
                key={h._id}
                className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm justify-between"
              >
                <div>
                  <span className="font-bold text-lg">{h.mood}</span>
                  {h.note && (
                    <span className="block text-gray-500 text-sm">
                      {h.note}
                    </span>
                  )}
                </div>
                <span className="text-gray-400 text-sm">
                  {h.date ? new Date(h.date).toLocaleDateString() : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 w-full py-2 px-8 rounded-lg text-lg font-semibold bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
