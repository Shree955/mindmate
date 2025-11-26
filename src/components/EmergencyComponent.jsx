import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBell,
  FaHeartbeat,
  FaSmile,
  FaUserPlus,
  FaCheckCircle,
  FaEdit,
  FaPlusCircle,
  FaWindowClose,
} from "react-icons/fa";

const SAFETY_PLAN_STORAGE_KEY = "emergencySafetyPlan";
const EMERGENCY_CONTACTS_STORAGE_KEY = "emergencyContacts";
const LAST_CHECKIN_STORAGE_KEY = "lastCheckInTime";

const indianEmergencyNumbers = [
  { name: "Police", number: "100" },
  { name: "Fire", number: "101" },
  { name: "Ambulance", number: "102" },
  { name: "Women Helpline", number: "1091" },
  { name: "Suicide Helpline", number: "988" },
];

const calmingTechniques = [
  "Deep breathing exercises",
  "Yoga and Pranayama",
  "Mindfulness meditation",
  "Listen to calming Indian classical music",
  "Take a warm water bath",
];

export default function EmergencySupport() {
  const [locationSharing, setLocationSharing] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [safetyPlan, setSafetyPlan] = useState("");
  const [editingPlan, setEditingPlan] = useState(false);
  const [planInput, setPlanInput] = useState("");

  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const [lastCheckInTime, setLastCheckInTime] = useState(null);
  const [shakeDetectionEnabled, setShakeDetectionEnabled] = useState(false);
  const [shakeAlertCountdown, setShakeAlertCountdown] = useState(0);

  useEffect(() => {
    const savedPlan = localStorage.getItem(SAFETY_PLAN_STORAGE_KEY) || "";
    setSafetyPlan(savedPlan);
    setPlanInput(savedPlan);

    const savedContacts =
      JSON.parse(localStorage.getItem(EMERGENCY_CONTACTS_STORAGE_KEY)) || [];
    setEmergencyContacts(savedContacts);

    const savedTime = localStorage.getItem(LAST_CHECKIN_STORAGE_KEY);
    if (savedTime) setLastCheckInTime(parseInt(savedTime, 10));
  }, []);

  useEffect(() => {
    if (shakeDetectionEnabled) {
      const handleShake = (event) => {
        const { x, y, z } = event.accelerationIncludingGravity;
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        const SHAKE_THRESHOLD = 20;

        if (acceleration > SHAKE_THRESHOLD && shakeAlertCountdown === 0) {
          setShakeAlertCountdown(5);
        }
      };
      window.addEventListener("devicemotion", handleShake);
      return () => window.removeEventListener("devicemotion", handleShake);
    }
  }, [shakeDetectionEnabled, shakeAlertCountdown]);

  useEffect(() => {
    let timer;
    if (shakeAlertCountdown > 0) {
      timer = setTimeout(() => {
        setShakeAlertCountdown((prev) => prev - 1);
      }, 1000);
    } else if (shakeAlertCountdown === 0 && shakeDetectionEnabled) {
      if (emergencyContacts.length > 0) {
        emergencyContacts.forEach((contact) => handleSendSOS(contact.number));
      } else {
        alert("Shake detected, but no emergency contacts are saved.");
      }
      setShakeDetectionEnabled(false);
    }
    return () => clearTimeout(timer);
  }, [shakeAlertCountdown, shakeDetectionEnabled, emergencyContacts]);

  const handleLocationToggle = () => {
    if (locationSharing) {
      setLocationSharing(false);
      setLocation(null);
      setLocationError(null);
    } else {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLocationError(null);
          setLocationSharing(true);
        },
        () => {
          setLocationError("Permission denied or unable to retrieve location.");
          setLocationSharing(false);
        }
      );
    }
  };

  const saveSafetyPlan = () => {
    const trimmed = planInput.trim();
    if (!trimmed) return alert("Safety plan cannot be empty.");
    setSafetyPlan(trimmed);
    localStorage.setItem(SAFETY_PLAN_STORAGE_KEY, trimmed);
    setEditingPlan(false);
  };

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (newContactName.trim() && newContactNumber.trim()) {
      const updatedContacts = [
        ...emergencyContacts,
        { name: newContactName, number: newContactNumber, id: Date.now() },
      ];
      setEmergencyContacts(updatedContacts);
      localStorage.setItem(
        EMERGENCY_CONTACTS_STORAGE_KEY,
        JSON.stringify(updatedContacts)
      );
      setNewContactName("");
      setNewContactNumber("");
    } else {
      alert("Please enter both a name and a number.");
    }
  };

  const handleSendSOS = (contactNumber) => {
    const message = location
      ? `I need urgent help. My location is: https://www.google.com/maps?q=${location.latitude},${location.longitude}`
      : "I need urgent help. Please try to contact me.";
    if (navigator.share) {
      navigator
        .share({
          title: "Emergency SOS",
          text: message,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      window.location.href = `sms:${contactNumber}?body=${encodeURIComponent(
        message
      )}`;
    }
  };

  const handleCheckIn = () => {
    const now = Date.now();
    setLastCheckInTime(now);
    localStorage.setItem(LAST_CHECKIN_STORAGE_KEY, now);
    alert("Status updated to 'I'm Safe'.");
  };

  const timeSinceCheckIn = lastCheckInTime
    ? Math.floor((Date.now() - lastCheckInTime) / 60000)
    : null;

  const checkInText = lastCheckInTime
    ? `Last check-in: ${
        timeSinceCheckIn < 1
          ? "Just now"
          : `${timeSinceCheckIn} minute${timeSinceCheckIn > 1 ? "s" : ""} ago`
      }`
    : "No recent check-in.";

  const sectionCard =
    "rounded-3xl bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-purple-300 shadow-xl mt-8 mb-8 px-8 py-7";
  const sectionHeading =
    "flex items-center gap-2 text-2xl md:text-3xl font-extrabold mb-5 tracking-tight";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-10 px-2 md:px-0">
      {/* Emergency Title */}
      <div className="mb-10 flex items-center gap-3 justify-center">
        <FaBell className="text-red-600 text-5xl drop-shadow-md" />
        <span className="text-red-700 text-5xl font-extrabold tracking-tight drop-shadow-md">
          Emergency Support
        </span>
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-200 to-orange-100 text-red-800 border border-red-300 font-bold ml-2 shadow-sm">
          URGENT
        </span>
      </div>

      {/* Quick SOS Numbers */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto mb-12">
        {indianEmergencyNumbers.map((num, i) => (
          <button
            key={num.number}
            onClick={() => handleCall(num.number)}
            className={`flex flex-col items-center shadow-lg gap-1 py-7 px-4 rounded-3xl bg-gradient-to-br from-red-500 to-orange-400 border-2 border-white hover:scale-105 hover:shadow-2xl transition-all`}
            aria-label={`${num.name} emergency`}
          >
            <FaPhoneAlt className="mb-2 text-2xl animate-pulse text-white drop-shadow" />
            <span className="font-bold text-base text-white">{num.name}</span>
            <span className="mt-1 text-xs text-red-200 tracking-wide">
              {num.number}
            </span>
          </button>
        ))}
      </section>

      {/* Location & Shake */}
      <div className="flex flex-col md:flex-row md:items-stretch gap-4 max-w-5xl mx-auto">
        <div
          className={`${sectionCard} flex-1 flex items-center justify-between`}
        >
          <label className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={locationSharing}
              onChange={handleLocationToggle}
              className="w-5 h-5 accent-red-600 rounded"
            />
            <FaMapMarkerAlt className="text-purple-500" />
            Share my location
            {location && (
              <a
                href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="ml-3 text-blue-700 underline font-bold hover:text-blue-900"
              >
                Map
              </a>
            )}
          </label>
          {locationError && (
            <div className="ml-4 text-red-600 text-sm">{locationError}</div>
          )}
        </div>
        <div className={`${sectionCard} flex-1 flex items-center`}>
          <label className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={shakeDetectionEnabled}
              onChange={() => setShakeDetectionEnabled(!shakeDetectionEnabled)}
              className="w-5 h-5 accent-yellow-500 rounded"
            />
            <FaBell className="text-yellow-500" /> Shake-to-SOS
            {shakeAlertCountdown > 0 && (
              <span className="ml-4 bg-yellow-200 border border-yellow-600 rounded-2xl px-4 py-1 shadow-sm font-bold animate-pulse text-yellow-800">
                SOS in {shakeAlertCountdown}s
              </span>
            )}
          </label>
        </div>
      </div>

      {/* Emergency Contacts */}
      <section className={sectionCard + " max-w-5xl mx-auto"}>
        <div className={sectionHeading}>
          <FaUserPlus className="text-blue-600" />
          Emergency Contacts
        </div>
        <div className="text-gray-400 mb-2 text-sm">
          Those listed will receive your SOS alert (via call or SMS).
        </div>
        <form
          onSubmit={handleAddContact}
          className="flex flex-col md:flex-row gap-4 mb-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
            className="flex-1 p-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
            maxLength={18}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={newContactNumber}
            onChange={(e) => setNewContactNumber(e.target.value)}
            className="flex-1 p-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
            maxLength={14}
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-2xl hover:bg-blue-900 shadow transition font-semibold text-base"
          >
            <FaPlusCircle /> Add
          </button>
        </form>
        {emergencyContacts.length > 0 && (
          <ul className="space-y-3">
            {emergencyContacts.map((contact) => (
              <li
                key={contact.id}
                className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-2xl shadow border border-gray-100"
              >
                <span className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaPhoneAlt className="text-green-600" />
                  {contact.name}
                  <span className="ml-1 px-2 py-0.5 bg-gray-200 rounded text-xs font-normal">
                    {contact.number}
                  </span>
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCall(contact.number)}
                    className="text-green-700 hover:text-green-900 transition text-lg"
                    title="Call"
                  >
                    <FaPhoneAlt />
                  </button>
                  <button
                    onClick={() => handleSendSOS(contact.number)}
                    className="text-red-600 hover:text-red-900 transition text-lg"
                    title="Send SOS"
                  >
                    <FaBell />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Safety Check */}
      <section className={sectionCard + " max-w-5xl mx-auto"}>
        <div className="flex items-center justify-between mb-2">
          <span className={sectionHeading}>
            <FaCheckCircle className="text-green-600" />
            Safety Status
          </span>
          <button
            onClick={handleCheckIn}
            className="flex items-center gap-2 px-7 py-3 bg-green-500 text-white rounded-full hover:bg-green-800 shadow font-bold text-base transition"
          >
            <FaSmile /> I'm Safe
          </button>
        </div>
        <p className="text-gray-600 font-medium">{checkInText}</p>
      </section>

      {/* Safety Plan */}
      <section className={sectionCard + " max-w-5xl mx-auto"}>
        <div className={sectionHeading}>
          <FaHeartbeat className="text-purple-600" />
          Safety Plan
        </div>
        {!editingPlan ? (
          <>
            <p className="text-gray-700 whitespace-pre-wrap border border-gray-200 p-5 rounded-xl min-h-[90px] shadow-sm">
              {safetyPlan || (
                <span className="italic text-gray-400">
                  You have no safety plan yet.
                </span>
              )}
            </p>
            <button
              onClick={() => setEditingPlan(true)}
              className="mt-3 flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-800 shadow transition font-semibold"
            >
              <FaEdit />{" "}
              {safetyPlan ? "Edit Safety Plan" : "Create Safety Plan"}
            </button>
          </>
        ) : (
          <>
            <textarea
              value={planInput}
              onChange={(e) => setPlanInput(e.target.value)}
              rows={5}
              className="w-full p-4 border-2 border-purple-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm mb-3"
            />
            <div className="flex gap-4">
              <button
                onClick={saveSafetyPlan}
                className="flex items-center gap-2 px-8 py-3 bg-purple-700 text-white rounded-2xl hover:bg-purple-900 shadow font-bold transition"
              >
                <FaCheckCircle /> Save
              </button>
              <button
                onClick={() => {
                  setEditingPlan(false);
                  setPlanInput(safetyPlan);
                }}
                className="flex items-center gap-2 px-8 py-3 border-2 border-gray-400 rounded-2xl hover:bg-gray-100 shadow transition font-semibold"
              >
                <FaWindowClose /> Cancel
              </button>
            </div>
          </>
        )}
      </section>

      {/* Calming Techniques */}
      <section className={sectionCard + " max-w-5xl mx-auto"}>
        <div className={sectionHeading}>
          <FaSmile className="text-yellow-500" />
          Calming Techniques
        </div>
        <div className="mb-3 text-gray-400 text-sm">
          Try one or more of these when feeling anxious or distressed.
        </div>
        <ul className="list-disc list-inside text-gray-700 mb-5">
          {calmingTechniques.map((tech, i) => (
            <li key={i} className="py-0.5">
              {tech}
            </li>
          ))}
        </ul>
        <iframe
          title="Guided meditation"
          src="https://www.youtube.com/embed/6p_yaNFSYao"
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video rounded-2xl shadow-lg"
        />
      </section>

      {/* Quick Tips */}
      <section className={sectionCard + " max-w-5xl mx-auto mb-10"}>
        <div className={sectionHeading}>
          <FaSmile className="text-blue-600" />
          Quick Tips
        </div>
        <ul className="list-disc list-inside text-gray-700 mb-2">
          <li>Reach out to a trusted friend or family member</li>
          <li>Stay in a safe environment</li>
          <li>Avoid alcohol and drugs</li>
          <li>Call emergency services if needed</li>
          <li>Share your location with loved ones</li>
          <li>Use breathing or grounding exercises in panic</li>
        </ul>
      </section>
    </div>
  );
}
