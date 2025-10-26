import { useState, useEffect } from "react";
import * as postService from '../../services/postService';
import headerImage from "../../assets/my-notes-header.png";
import './PostListPage.css';

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
        posts.filter(post =>
          (post.inputText && post.inputText.toLowerCase().includes(lowerTerm)) ||
          (post.translation && post.translation.toLowerCase().includes(lowerTerm))
        )
      );
    }
  }, [searchTerm, posts]);

  return (
    <div className="post-list-page">
      {/* Header + Search */}
      <div className="header-container">
        <img 
          src={headerImage} 
          alt="Lingua AI" 
          className="header-image"
        />
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
                <p>{post.inputText}</p>
                {post.translation && <p className="text-gray-600 mt-1">Translation: {post.translation}</p>}
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
