import { useState } from "react";
import Navbar from "../Navbar";
import {
  FaRobot,
  FaUserCircle,
  FaPaperPlane,
  FaMicrophone,
  FaHospital,
  FaAmbulance,
  FaPhoneAlt,
  FaHeartbeat,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";


function AIAssistant() {
  const [message, setMessage] = useState("");

  const suggestions = [
    "Heart Attack Symptoms",
    "CPR Guide",
    "How to Stop Bleeding?",
    "Burn Treatment",
    "Snake Bite First Aid",
    "Road Accident Help",
  ];

  const [messages, setMessages] = useState([
  {
    sender: "ai",
    text:
      "👋 Hello! I'm ResQ AI. Ask me anything related to emergencies, hospitals, first aid or safety.",
  },
]);

const sendMessage = async () => {
  if (!message.trim()) return;

  const userMessage = {
    sender: "user",
    text: message,
  };

  setMessages((prev) => [...prev, userMessage]);

  const userQuestion = message;
  setMessage("");

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userQuestion,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: data.reply,
      },
    ]);
  } catch (err) {
    console.log(err);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: "Something went wrong.",
      },
    ]);
  }
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 max-w-7xl mx-auto px-6">

        {/* Hero */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl text-white p-8 shadow-lg">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-4 rounded-full">
              <FaRobot className="text-4xl" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                AI Emergency Assistant
              </h1>

              <p className="mt-2 text-red-100">
                Get instant emergency guidance powered by AI.
              </p>
            </div>

          </div>

        </div>

        {/* Suggestions */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Quick Suggestions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

            {suggestions.map((item) => (

              <button
                key={item}
                onClick={() => setMessage(item)}
                className="bg-white rounded-xl shadow p-4 hover:bg-red-50 transition font-semibold"
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* Chat */}

        <div className="mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header */}

          <div className="bg-slate-900 text-white px-6 py-4 flex items-center gap-3">

            <FaRobot className="text-3xl text-red-500" />

            <div>

              <h2 className="font-bold text-xl">
                ResQ AI
              </h2>

              <p className="text-gray-300 text-sm">
                Online • Ready to Help
              </p>

            </div>

          </div>

          {/* Messages */}

          <div className="h-[450px] overflow-y-auto p-6 space-y-6">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "ai"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >

                <div
                  className={`max-w-lg rounded-2xl px-5 py-4 ${
                    msg.sender === "ai"
                      ? "bg-red-100"
                      : "bg-blue-600 text-white"
                  }`}
                >

                  <div className="flex items-center gap-2 mb-2">

                    {msg.sender === "ai" ? (
                      <FaRobot className="text-red-600" />
                    ) : (
                      <FaUserCircle />
                    )}

                    <span className="font-semibold">
                      {msg.sender === "ai" ? "ResQ AI" : "You"}
                    </span>

                  </div>

                  <div className="prose prose-red max-w-none text-xl">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Input */}

          <div className="border-t p-4">

            <div className="flex items-center gap-3">

              <input
                type="text"
                placeholder="Ask anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                className="flex-1 border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-red-500"
              />

              <button className="bg-gray-200 p-4 rounded-xl hover:bg-gray-300">
                <FaMicrophone />
              </button>

              <button
                onClick={sendMessage}
                className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700"
              >
                <FaPaperPlane />
              </button>

            </div>

          </div>

        </div>

        {/* Emergency Actions */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Emergency Actions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <button className="bg-red-600 text-white rounded-xl p-6 hover:bg-red-700 transition">

              <FaHeartbeat className="text-4xl mx-auto" />

              <p className="mt-4 font-semibold">
                SOS
              </p>

            </button>

            <button className="bg-blue-600 text-white rounded-xl p-6 hover:bg-blue-700 transition">

              <FaHospital className="text-4xl mx-auto" />

              <p className="mt-4 font-semibold">
                Hospitals
              </p>

            </button>

            <button className="bg-green-600 text-white rounded-xl p-6 hover:bg-green-700 transition">

              <FaAmbulance className="text-4xl mx-auto" />

              <p className="mt-4 font-semibold">
                Ambulance
              </p>

            </button>

            <button className="bg-yellow-500 text-white rounded-xl p-6 hover:bg-yellow-600 transition">

              <FaPhoneAlt className="text-4xl mx-auto" />

              <p className="mt-4 font-semibold">
                Emergency Call
              </p>

            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AIAssistant;
