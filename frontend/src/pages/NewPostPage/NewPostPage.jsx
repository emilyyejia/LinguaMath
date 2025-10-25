import { useState } from "react";
import { useNavigate } from "react-router";
import * as postService from "../../services/postService";
import OpenAIChat from "../../components/OpenAIChat/OpenAIChat";
import { MathJaxContext } from "better-react-mathjax";

export default function NewPostPage() {
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await postService.create({ content });
      navigate('/posts');
    } catch (err) {
      setErrorMsg('Adding Post Failed');
      console.error(err);
    }
  }

  async function handleAIReply({ inputType, inputText, imageUrl, mode, aiReply }) {
    try {
      const postData = {
        inputType,
        inputText,
        imageUrl,
        sourceLanguage: "en",
        targetLanguage: "zh",
      };

      // Save according to mode
      if (mode === "translate") postData.translation = aiReply;
      if (mode === "culture") postData.culture = aiReply;
      if (mode === "hint") postData.hint = aiReply;

      await postService.create(postData);
      console.log("✅ Saved to MongoDB:", postData);
    } catch (err) {
      console.error("❌ Failed to save AI interaction:", err);
    }
  }

  return (
    <div className="container-fluid p-0" style={{ height: '100vh' }}>
      <div className="d-flex" style={{ height: '100%' }}>
        {/* Left side - takes remaining space */}
        <div className="flex-grow-1 border rounded p-3 bg-light d-flex flex-column">
          {/* ✅ Wrap OpenAIChat in MathJaxContext */}
          <MathJaxContext>
            <OpenAIChat onAIReply={handleAIReply} />
          </MathJaxContext>
        </div>

        {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
      </div>
    </div>
  );
}
