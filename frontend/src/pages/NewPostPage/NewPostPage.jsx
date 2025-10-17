import { useState } from "react";
import { useNavigate } from "react-router";
import * as postService from "../../services/postService";
import OpenAIChat from "../../components/OpenAIChat/OpenAIChat";

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

  function handleAIReply(aiText) {
    setContent(aiText);
  }

  return (
    <div className="container-fluid p-0" style={{ height: '100vh' }}> {/* full screen */}
      <div className="d-flex" style={{ height: '100%' }}>

        {/* Left side - takes remaining space */}
        <div className="flex-grow-1 border rounded p-3 bg-light d-flex flex-column">
    
          <OpenAIChat onAIReply={handleAIReply} />
        </div>

          {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
        </div>

    </div>
  );
}
