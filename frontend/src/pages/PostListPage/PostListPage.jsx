import { useState, useEffect } from "react";
import * as postService from "../../services/postService";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import headerImage from "../../assets/my-notes-header.png";
import "./PostListPage.css";

// Sanitize text copied from ChatGPT, DeepSeek, Gemini, etc.
function sanitizeText(text) {
  if (!text) return '';
  
  let cleaned = text;
  
  // Detect if text has excessive line breaks
  const lineBreakCount = (cleaned.match(/\n/g) || []).length;
  const charCount = cleaned.replace(/\s/g, '').length;
  
  if (lineBreakCount > charCount / 3) {
    cleaned = cleaned.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  } else {
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  }
  
  // Remove stray unicode math symbols
  cleaned = cleaned.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ₐₑₒₓₔ₊₋₌₍₎]/g, '');
  
  // Remove dollar signs that appear as plain text
  cleaned = cleaned.replace(/\$(\d)/g, '$1');
  cleaned = cleaned.replace(/(\d)\$/g, '$1');
  
  // Normalize common math operators
  cleaned = cleaned.replace(/×/g, '\\times');
  cleaned = cleaned.replace(/÷/g, '\\div');
  
  return cleaned;
}

// Helper function to parse text with LaTeX
function parseLatex(text) {
  if (!text) return [];
  
  const sanitized = sanitizeText(text);
  const parts = [];
  let lastIndex = 0;
  
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let match;
  
  while ((match = regex.exec(sanitized)) !== null) {
    if (match.index > lastIndex) {
      const textContent = sanitized.substring(lastIndex, match.index);
      if (textContent.trim()) {
        parts.push({
          type: 'text',
          content: textContent
        });
      }
    }
    
    if (match[1]) {
      parts.push({
        type: 'display',
        content: match[1].trim()
      });
    } else if (match[2]) {
      parts.push({
        type: 'inline',
        content: match[2].trim()
      });
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < sanitized.length) {
    const remainingText = sanitized.substring(lastIndex);
    if (remainingText.trim()) {
      parts.push({
        type: 'text',
        content: remainingText
      });
    }
  }
  
  return parts.length > 0 ? parts : [{ type: 'text', content: sanitized }];
}

// Component to render text with LaTeX (same as in OpenAIChat)
function MathText({ text }) {
  const parts = parseLatex(text);
  
  return (
    <span>
      {parts.map((part, idx) => {
        if (part.type === 'inline') {
          try {
            const html = katex.renderToString(part.content, {
              throwOnError: false,
              displayMode: false
            });
            return <span key={idx} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch (e) {
            return <span key={idx}>${part.content}$</span>;
          }
        } else if (part.type === 'display') {
          try {
            const html = katex.renderToString(part.content, {
              throwOnError: false,
              displayMode: true
            });
            return <div key={idx} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch (e) {
            return <div key={idx}>$${part.content}$$</div>;
          }
        } else {
          // Preserve line breaks and handle basic markdown
          const lines = part.content.split('\n');
          return lines.map((line, lineIdx) => {
            // Handle bold markdown **text**
            const boldProcessed = line.split(/(\*\*.*?\*\*)/).map((segment, segIdx) => {
              if (segment.startsWith('**') && segment.endsWith('**')) {
                return <strong key={segIdx}>{segment.slice(2, -2)}</strong>;
              }
              return segment;
            });
            
            return (
              <span key={idx + '-' + lineIdx}>
                {boldProcessed}
                {lineIdx < lines.length - 1 && <br />}
              </span>
            );
          });
        }
      })}
    </span>
  );
}

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await postService.index();
        setPosts(posts);
        setFilteredPosts(posts);
      } catch (err) {
        console.error("Failed to fetch saved posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPosts(posts);
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      setFilteredPosts(
        posts.filter(
          (post) =>
            (post.inputText &&
              post.inputText.toLowerCase().includes(lowerTerm)) ||
            (post.translation &&
              post.translation.toLowerCase().includes(lowerTerm))
        )
      );
    }
  }, [searchTerm, posts]);

  return (
    <div className="post-list-page">
      {/* Header */}
      <div className="header-container">
        <div className="header-title-wrapper">
          <img src={headerImage} alt="My Notes" className="header-image-logo" />
          <span className="my-notes-title">MyNotes</span>
        </div>

        <input
          type="text"
          placeholder="Search your notes..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Notes list */}
      <div className="posts-list-container">
        {loading ? (
          <p>Loading...</p>
        ) : filteredPosts.length ? (
          <div className="posts-list">
            {filteredPosts.map((post) => (
              <div key={post._id} className="post-item">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="saved"
                    className="post-image"
                  />
                )}

                <div className="post-text">
                  <MathText text={post.inputText} />
                </div>

                {post.translation && (
                  <div className="post-translation text-gray-600 mt-1">
                    <MathText text={post.translation} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No saved messages yet.</p>
        )}
      </div>
    </div>
  );
}