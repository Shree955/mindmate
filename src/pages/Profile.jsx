import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  // Initialize name/email when entering edit mode or when user changes
  useEffect(() => {
    if (user && isEditing) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user, isEditing]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      setMessageType("error");
      setMessage("Name cannot be empty.");
      return;
    }
    if (!validateEmail(email)) {
      setMessageType("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ name: name.trim(), email: email.trim() }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setMessageType("success");
        setMessage("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to update profile.");
      }
    } catch {
      setMessageType("error");
      setMessage("An error occurred. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Profile</h1>

      <Card className="max-w-lg mx-auto p-6 bg-white shadow-md">
        {!isEditing ? (
          <>
            {/* Display user info as text */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <p className="text-lg">{user?.name || "-"}</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <p className="text-lg">{user?.email || "-"}</p>
            </div>

            <button
              onClick={() => {
                setIsEditing(true);
                setMessage("");
              }}
              className="w-full py-2 rounded-md font-semibold text-white bg-purple-600 hover:bg-purple-700 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            {/* Editable inputs */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                disabled={loading}
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className={`py-2 px-6 rounded-md font-semibold text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className="py-2 px-6 rounded-md font-semibold text-purple-700 border border-purple-700 hover:bg-purple-100 transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {message && (
          <p
            className={`mt-4 text-center ${
              messageType === "success"
                ? "text-green-600"
                : messageType === "error"
                ? "text-red-600"
                : "text-gray-600"
            }`}
            role={messageType === "error" ? "alert" : undefined}
          >
            {message}
          </p>
        )}
      </Card>
    </div>
  );
}
