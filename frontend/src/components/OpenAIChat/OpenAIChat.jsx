import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./OpenAIChat.css";

export default function OpenAIChat({ onAIReply }) {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [mode, setMode] = useState("translate");
  const [toast, setToast] = useState("");
  const [showMathKeyboard, setShowMathKeyboard] = useState(false);
  const [fractionNum, setFractionNum] = useState("");
  const [fractionDen, setFractionDen] = useState("");
  const [mixedWhole, setMixedWhole] = useState("");
  const [mixedNum, setMixedNum] = useState("");
  const [mixedDen, setMixedDen] = useState("");
  const [showFractionInput, setShowFractionInput] = useState(false);
  const [showMixedInput, setShowMixedInput] = useState(false);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Auto-hide toast after 2 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const insertMathSymbol = (symbol) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = prompt;

    const newText = text.substring(0, start) + symbol + text.substring(end);
    setPrompt(newText);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + symbol.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleInsertFraction = () => {
    if (fractionNum && fractionDen) {
      insertMathSymbol(`$\\frac{${fractionNum}}{${fractionDen}}$`);
      setFractionNum("");
      setFractionDen("");
      setShowFractionInput(false);
    }
  };

  const handleInsertMixed = () => {
    if (mixedWhole && mixedNum && mixedDen) {
      insertMathSymbol(`$${mixedWhole}\\frac{${mixedNum}}{${mixedDen}}$`);
      setMixedWhole("");
      setMixedNum("");
      setMixedDen("");
      setShowMixedInput(false);
    }
  };

  const basicSymbols = [
    { label: "+", symbol: " + ", category: "basic" },
    { label: "−", symbol: " - ", category: "basic" },
    { label: "×", symbol: " × ", category: "basic" },
    { label: "÷", symbol: " ÷ ", category: "basic" },
    { label: "=", symbol: " = ", category: "basic" },
  ];

  const commonFractions = [
    { label: "½", symbol: "$\\frac{1}{2}$" },
    { label: "⅓", symbol: "$\\frac{1}{3}$" },
    { label: "¼", symbol: "$\\frac{1}{4}$" },
    { label: "⅕", symbol: "$\\frac{1}{5}$" },
    { label: "⅔", symbol: "$\\frac{2}{3}$" },
    { label: "¾", symbol: "$\\frac{3}{4}$" },
  ];

  const advancedSymbols = [
    { label: "x²", symbol: "$x^{2}$", tooltip: "Square" },
    { label: "x³", symbol: "$x^{3}$", tooltip: "Cube" },
    { label: "√", symbol: "$\\sqrt{  }$", tooltip: "Square root" },
    { label: "∛", symbol: "$\\sqrt[3]{  }$", tooltip: "Cube root" },
    { label: "≠", symbol: "$\\neq$", tooltip: "Not equal" },
    { label: "≈", symbol: "$\\approx$", tooltip: "Approximately equal" },
    { label: "<", symbol: "$<$", tooltip: "Less than" },
    { label: ">", symbol: "$>$", tooltip: "Greater than" },
    { label: "≤", symbol: "$\\leq$", tooltip: "Less than or equal" },
    { label: "≥", symbol: "$\\geq$", tooltip: "Greater than or equal" },
    { label: "±", symbol: "$\\pm$", tooltip: "Plus-minus" },
    { label: "π", symbol: "$\\pi$", tooltip: "Pi" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt && !imageFile) return;
    setLoading(true);

    try {
      const systemPrompt =
        mode === "translate"
          ? `Translate this text clearly in Chinese and accurately while preserving mathematical meaning. Use LaTeX format for math expressions (wrap in $ for inline math):\n${prompt}`
          : mode === "culture"
            ? `You are a bilingual math tutor who helps Chinese newcomer students in Canada understand math word problems.

Step 1: Identify and explain Canadian or English cultural terms that may be unfamiliar to Chinese students (e.g., muffin, cup, yard, gallon, snow shovel).

Step 2: Give short explanations in both English and Chinese using familiar cultural comparisons from China. Do NOT provide a full solution. Use LaTeX format for math expressions (wrap in $ for inline math).
\n${prompt}`
            : `Provide a step-by-step hint for solving this math question in both English and Chinese without giving the full answer. Use LaTeX format for math expressions (wrap in $ for inline math):\n${prompt}`;
      const API_BASE_URL = 'https://www.linguamath.ca' || '';

      const endpoint = imageFile ? `${API_BASE_URL}/api/openai-vision` : `${API_BASE_URL}/api/openai`;

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
      if (fileInputRef.current) fileInputRef.current.value = "";
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
      const API_BASE_URL = 'https://www.linguamath.ca' || '';
      const res = await fetch(`${API_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
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
        {/* Hidden textarea for actual input */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            mode === "translate"
              ? "Enter text or math problem to translate..."
              : mode === "culture"
                ? "Enter math topic or problem to explain with cultural context..."
                : "Enter a math question to get a hint..."
          }
          className="hidden-textarea"
        />

        {/* Visual Preview (looks like input) */}
        <div
          className="math-preview-input"
          onClick={() => textareaRef.current?.focus()}
        >
          {prompt ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {prompt}
            </ReactMarkdown>
          ) : (
            <span className="preview-placeholder">
              {mode === "translate"
                ? "Enter text or math problem to translate..."
                : mode === "culture"
                  ? "Enter math topic or problem to explain with cultural context..."
                  : "Enter a math question to get a hint..."}
            </span>
          )}
        </div>

        <button
          type="button"
          className="ai-btn math-keyboard-toggle"
          onClick={() => setShowMathKeyboard(!showMathKeyboard)}
        >
          {showMathKeyboard ? "Hide" : "Show"} Math Keyboard
        </button>

        {showMathKeyboard && (
          <div className="math-keyboard-panel">
            {/* Basic Operations */}
            <div className="keyboard-section">
              <div className="section-title">Basic Operations</div>
              <div className="button-grid basic-grid">
                {basicSymbols.map((btn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="math-btn basic-btn"
                    onClick={() => insertMathSymbol(btn.symbol)}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Common Fractions */}
            <div className="keyboard-section">
              <div className="section-title">Common Fractions</div>
              <div className="button-grid fraction-grid">
                {commonFractions.map((btn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="math-btn fraction-btn"
                    onClick={() => insertMathSymbol(btn.symbol)}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Fraction Builder */}
            <div className="keyboard-section">
              <div className="section-title">Build Custom Fraction</div>
              {!showFractionInput ? (
                <button
                  type="button"
                  className="builder-btn"
                  onClick={() => setShowFractionInput(true)}
                >
                  ➕ Create Fraction
                </button>
              ) : (
                <div className="fraction-builder">
                  <input
                    type="number"
                    placeholder="Numerator"
                    value={fractionNum}
                    onChange={(e) => setFractionNum(e.target.value)}
                    className="fraction-input"
                  />
                  <div className="fraction-divider">―</div>
                  <input
                    type="number"
                    placeholder="Denominator"
                    value={fractionDen}
                    onChange={(e) => setFractionDen(e.target.value)}
                    className="fraction-input"
                  />
                  <button
                    type="button"
                    className="insert-btn"
                    onClick={handleInsertFraction}
                  >
                    Insert
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowFractionInput(false);
                      setFractionNum("");
                      setFractionDen("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Mixed Number Builder */}
            <div className="keyboard-section">
              <div className="section-title">Build Mixed Number</div>
              {!showMixedInput ? (
                <button
                  type="button"
                  className="builder-btn"
                  onClick={() => setShowMixedInput(true)}
                >
                  ➕ Create Mixed Number (e.g., 2¾)
                </button>
              ) : (
                <div className="mixed-builder">
                  <input
                    type="number"
                    placeholder="Whole"
                    value={mixedWhole}
                    onChange={(e) => setMixedWhole(e.target.value)}
                    className="mixed-input"
                  />
                  <input
                    type="number"
                    placeholder="Num"
                    value={mixedNum}
                    onChange={(e) => setMixedNum(e.target.value)}
                    className="mixed-input"
                  />
                  <div className="fraction-divider">―</div>
                  <input
                    type="number"
                    placeholder="Den"
                    value={mixedDen}
                    onChange={(e) => setMixedDen(e.target.value)}
                    className="mixed-input"
                  />
                  <button
                    type="button"
                    className="insert-btn"
                    onClick={handleInsertMixed}
                  >
                    Insert
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowMixedInput(false);
                      setMixedWhole("");
                      setMixedNum("");
                      setMixedDen("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Advanced Symbols */}
            <div className="keyboard-section">
              <div className="section-title">Advanced Symbols</div>
              <div className="button-grid advanced-grid">
                {advancedSymbols.map((btn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="math-btn advanced-btn"
                    onClick={() => insertMathSymbol(btn.symbol)}
                    title={btn.tooltip}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
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
            <div className="message-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {msg.text}
              </ReactMarkdown>
            </div>

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