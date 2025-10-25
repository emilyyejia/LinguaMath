import React, { useState, useRef, useEffect } from "react";
import "./OpenAIChat.css";

export default function OpenAIChat({ onAIReply }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [mode, setMode] = useState("translate");
  const [toast, setToast] = useState("");
  const bottomRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Hide toast after 2 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt && !imageFile) return;
    setLoading(true);

    try {
      const systemPrompt =
        mode === "translate"
          ? `Translate this text clearly in Chinese and accurately while preserving mathematical meaning:\n${prompt}`
          : mode === "culture"
          ? `You are a bilingual math tutor who helps Chinese newcomer students in Canada understand math word problems.

Step 1: Identify and explain Canadian or English cultural terms or items that may be unfamiliar to Chinese students (for example: muffin, cup, yard, gallon, snow shovel, camping trip).

Step 2: Give short explanations in both English and Chinese, using familiar cultural or daily life comparisons from China. Please do not provide solution or answer to the math problem.
:\n${prompt}`
          : `Provide a step-by-step hint for solving this math question in both English and Chinese without giving the full answer:\n${prompt}`;

      const endpoint = imageFile ? "/api/openai-vision" : "/api/openai";

      let body;
      let headers = {};
      if (imageFile) {
        body = new FormData();
        body.append("image", imageFile);
        body.append("prompt", systemPrompt);
      } else {
        body = JSON.stringify({ prompt: systemPrompt });
        headers["Content-Type"] = "application/json";
      }

      setMessages((prev) => [
        ...prev,
        { role: "user", text: prompt, image: imagePreview || null },
      ]);

      const res = await fetch(endpoint, { method: "POST", headers, body });

      const data = await res.json();

      const aiMessage = { role: "ai", text: data.reply || "No response from AI." };
      setMessages((prev) => [...prev, aiMessage]);

      if (onAIReply)
        onAIReply({
          inputType: imageFile ? "image" : "text",
          inputText: prompt,
          imageUrl: imagePreview || null,
          mode,
          aiReply: data.reply,
        });

      setPrompt("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error calling AI:", err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error: could not reach AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleAddToLog = async (msg) => {
    if (!msg.text) return;
    try {
      const postData = {
        inputType: msg.image ? "image" : "text",
        inputText: msg.text,
        imageUrl: msg.image || null,
        savedToLog: true,
        sourceLanguage: "en",
        targetLanguage: "zh",
      };
      const token = localStorage.getItem("token");
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      const savedPost = await res.json();
      if (res.ok) setToast("Added to Log!");
      else setToast("Failed to save to log");
    } catch (err) {
      console.error("Error saving to log:", err);
      setToast("Error saving to log");
    }
  };

  return (
    <div className="openai-chat-container">
      {toast && <div className="toast">{toast}</div>}

      <div className="mode-buttons">
        {["translate", "culture", "hint"].map((m) => (
          <button
            key={m}
            type="button"
            className={`ai-btn ${mode === m ? "active-mode" : ""}`}
            onClick={() => setMode(m)}
          >
            {m === "translate"
              ? "Translate"
              : m === "culture"
              ? "Relate to Your Culture"
              : "Hint"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            mode === "translate"
              ? "Enter text or math problem to translate..."
              : mode === "culture"
              ? "Enter math topic or problem to explain with cultural context..."
              : "Enter a math question to get a hint..."
          }
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {imagePreview && (
          <div className="text-center">
            <img src={imagePreview} alt="Selected" className="image-preview" />
          </div>
        )}
        <button type="submit" className="ai-btn ask-btn" disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      <div className="messages-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.image && <img src={msg.image} alt="user-upload" />}
            <p>{msg.text}</p>
            {msg.role === "ai" && (
              <button className="ai-btn mt-2" onClick={() => handleAddToLog(msg)}>
                Add to Log
              </button>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
