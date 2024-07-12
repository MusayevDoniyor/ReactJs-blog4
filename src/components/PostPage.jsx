import { useParams, Link, useNavigate } from "react-router-dom";
import { SpinnerButton } from "./Spinners";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../store/postSlice";
import { api } from "../api/api";

const PostPage = ({
  posts,
  handleDelete,
  deleteError,
  deleteLoading,
  setDeleteError,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [editError, setEditError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  async function handleEdit() {
    try {
      await api.patch(`/posts/${post.id}`, { title, body });
      dispatch(editPost({ ...post, title, body }));
      setEditing(!editing);
    } catch (error) {
      setEditError(error.message);
    }
  }

  return (
    <main className="PostPage">
      {deleteError && (
        <p className="error">
          <b>Error while deleting post:</b> {deleteError}
          <span
            onClick={() => {
              navigate(-1);
              setDeleteError(null);
            }}
          >
            Back
          </span>
        </p>
      )}

      {editError && (
        <p className="error">
          <b>Error while editing post:</b> {editError}
          <span
            onClick={() => {
              navigate(-1);
              setEditError(null);
            }}
          >
            Back
          </span>
        </p>
      )}

      <article className="post">
        {post ? (
          <>
            {editing ? (
              <form>
                <input
                  type="text"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  style={{ marginTop: "10px" }}
                  name="body"
                  value={body}
                  rows={5}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </form>
            ) : (
              <>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
                <p className="postBody">{post.body}</p>
              </>
            )}

            <button
              disabled={deleteLoading || editing}
              onClick={() => handleDelete(post.id)}
            >
              {deleteLoading ? (
                <SpinnerButton color={"#66d8f5"}></SpinnerButton>
              ) : (
                "Delete Post"
              )}
            </button>

            <button
              onClick={() => {
                if (post) {
                  handleEdit();
                } else {
                  setEditing(!editing);
                }
              }}
              style={{
                margin: "0 7px",
                backgroundColor: "#66d8f5",
                color: "#000",
              }}
            >
              {editing ? "Save" : "Edit Post"}
            </button>

            <button
              style={{ backgroundColor: "#333" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </>
        ) : (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
