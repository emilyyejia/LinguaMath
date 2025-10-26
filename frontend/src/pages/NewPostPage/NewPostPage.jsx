import { useState } from "react";
import { useNavigate } from "react-router";
import * as postService from "../../services/postService";
import OpenAIChat from "../../components/OpenAIChat/OpenAIChat";
import { MathJaxContext } from "better-react-mathjax";
import headerImage from "../../assets/lingua-ai-header.png";
import './NewPostPage.css'; // we'll add new CSS for styling

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
    <div className="newpost-page-container">
      {/* Header */}
      <div className="header-container">
        <div className="header-title-wrapper">
          
          <span className="header-title">Lingua</span>
          <img src={headerImage} alt="Lingua AI" className="header-image" />
        </div>
      </div>

      {/* Chat area */}
      <div className="chat-container">
        <MathJaxContext>
          <OpenAIChat onAIReply={handleAIReply} />
        </MathJaxContext>
      </div>

      {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
    </div>
  );
}
