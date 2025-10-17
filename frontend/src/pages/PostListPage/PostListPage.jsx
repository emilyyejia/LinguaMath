import { useState, useEffect } from "react";
import * as postService from '../../services/postService';

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await postService.index(); // backend already filters savedToLog
        setPosts(posts);
      } catch (err) {
        console.error("Failed to fetch saved posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : posts.length ? (
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {posts.map((post) => (
            <div key={post._id} className="p-3 border rounded shadow-sm bg-gray-50">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="saved"
                  className="mb-2 w-full max-h-48 object-contain border rounded"
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
  );
}
