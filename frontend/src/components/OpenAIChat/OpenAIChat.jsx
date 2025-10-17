import React, { useState, useRef, useEffect } from "react";

export default function OpenAIChat({ onAIReply }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]); // conversation
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [mode, setMode] = useState("translate"); // translate | culture | hint
  const bottomRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt && !imageFile) return;
    setLoading(true);

    try {
      // Construct system prompt
      const systemPrompt =
        mode === "translate"
          ? `Translate this text clearly in Chinese and accurately while preserving mathematical meaning:\n${prompt}`
          : mode === "culture"
            ? `Explain this math concept in a way that connects to the Chinese culture or local examples in English and Chinese:\n${prompt}`
            : `Provide a step-by-step hint for solving this math question in both English and Chinese without giving the full answer:\n${prompt}`;

      const endpoint = imageFile ? "/api/openai-vision" : "/api/openai";

      // FormData for vision route
      let body;
      let headers = {};
      if (imageFile) {
        body = new FormData();
        body.append("image", imageFile); // multer expects "image"
        body.append("prompt", systemPrompt);
      } else {
        body = JSON.stringify({ prompt: systemPrompt });
        headers["Content-Type"] = "application/json";
      }

      // Add user message
      setMessages((prev) => [...prev, { role: "user", text: prompt, image: imagePreview || null }]);

      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers,
        body,
      });
      const data = await res.json();

      // Add AI reply
      setMessages((prev) => [...prev, { role: "ai", text: data.reply || "No response from AI." }]);
      if (typeof onAIReply === "function") {
        onAIReply({
          inputType: imageFile ? "image" : "text",
          inputText: prompt,
          imageUrl: imagePreview || null,
          mode,
          aiReply: data.reply,
        });
      }
      // Reset input
      setPrompt("");
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error calling AI:", err);
      setMessages((prev) => [...prev, { role: "ai", text: "Error: could not reach AI." }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
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

  return (
    <div className="p-4 max-w-lg mx-auto border rounded" style={{ backgroundColor: "#f9f9f9" }}>
      <h2 className="text-xl font-semibold mb-3">AI Math Assistant</h2>

      {/* Mode selector */}
      <div className="d-flex mb-3">
        {["translate", "culture", "hint"].map((m) => (
          <button
            key={m}
            type="button"
            className={`btn me-2 ${mode === m ? "btn-dark" : "btn-light"}`}
            onClick={() => setMode(m)}
          >
            {m === "translate" ? "Translate" : m === "culture" ? "Relate to Your Culture" : "Hint"}
          </button>
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="d-flex flex-column">
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
          className="form-control mb-3"
          rows="3"
        />

        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={handleFileChange}
        />

        {/* Preview */}
        {imagePreview && (
          <div className="mb-3 text-center">
            <img
              src={imagePreview}
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "5px" }}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {/* Chat messages */}
      <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="user-upload"
                className="mb-2 w-48 border rounded mx-auto"
              />
            )}
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
