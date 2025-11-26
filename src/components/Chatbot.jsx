import { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./ChatbotIcon.css";
import { AuthContext } from "../context/AuthContext";

const Chatbot = () => {
    const { user } = useContext(AuthContext);
   
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const location = useLocation();

  // 🔥 Increment chat count for this user
  const incrementChatCount = async () => {
    if (!user?._id) {
    console.log("no id");
    
      return; // skip if not logged in
    }  
    try {
      const res = await fetch("http://localhost:5000/api/chat/increment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await res.json();
      console.log("🧮 Total chats:", data.totalChats);
    } catch (error) {
      console.error("Error incrementing chat count:", error);
    }
  };

  // 💡 Auto-open chat if user visits /ai-chat
  useEffect(() => {
    if (location.pathname === "/ai-chat") {
      setIsOpen(true);
      incrementChatCount(); // 🔥 increase count
      if (messages.length === 0) {
        setMessages([
          {
            sender: "bot",
            text: "Hello! I'm your AI Chat Bot 🤖. How can I help you today?",
          },
        ]);
      }
    }
  }, [location.pathname]);

  // 💬 Toggle chat manually
  const toggleChat = () => {
    if (!isOpen) {
      incrementChatCount(); // 🔥 increase count when user opens manually
      if (messages.length === 0) {
        setMessages([
          {
            sender: "bot",
            text: "Hello! I'm your AI Chat Bot 🤖. How can I help you today?",
          },
        ]);
      }
    }
    setIsOpen(!isOpen);
  };

  const closeChat = () => setIsOpen(false);

  // 📨 Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
    }

    setInput("");
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div className="chat-icon" onClick={toggleChat}>
        💬
      </div>

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <span>AI Chat Bot</span>
            <button className="close-btn" onClick={closeChat}>
              ✖
            </button>
          </div>

          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="input-area">
            <input
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
