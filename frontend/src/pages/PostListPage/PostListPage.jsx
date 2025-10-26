import { useState, useEffect } from "react";
import * as postService from "../../services/postService";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import headerImage from "../../assets/my-notes-header.png";
import "./PostListPage.css";

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
    <MathJaxContext>
      <div className="post-list-page">
        {/* Header */}
        <div className="header-container">
          <div className="header-title-wrapper">
            <img src={headerImage} alt="My Notes" className="header-image-logo" />
            <span className="my-notes-title">My Notes</span>
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

                  {/* Render LaTeX directly */}
                  <MathJax dynamic>
                    <p className="post-text">{post.inputText}</p>
                  </MathJax>

                  {post.translation && (
                    <MathJax dynamic>
                      <p className="post-translation text-gray-600 mt-1">
                        {post.translation}
                      </p>
                    </MathJax>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No saved messages yet.</p>
          )}
        </div>
      </div>
    </MathJaxContext>
  );
}
