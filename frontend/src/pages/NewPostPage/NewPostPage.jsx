import { useState } from "react";
import { useNavigate } from "react-router";
import * as postService from "../../services/postService";
import OpenAIChat from "../../components/OpenAIChat/OpenAIChat";
import { MathJaxContext } from "better-react-mathjax";
import headerImage from "../../assets/lingua-ai-header.png"; // adjust path

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
    <div className="container-fluid p-0" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header - double size */}
      <div className="text-center" style={{ flex: '0 0 80px' }}>
        <img 
          src={headerImage} 
          alt="Lingua AI" 
          style={{ height: '70px', objectFit: 'contain', marginTop: '5px' }}
        />
      </div>

      {/* Chat area fills remaining space */}
      <div style={{ flex: '1 1 auto', overflow: 'hidden', display: 'flex', padding: '1rem' }}>
        <div className="flex-grow-1 border rounded bg-light d-flex flex-column">
          <MathJaxContext>
            <OpenAIChat onAIReply={handleAIReply} />
          </MathJaxContext>
        </div>
      </div>

      {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
    </div>
  );
}
