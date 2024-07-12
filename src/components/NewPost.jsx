import { useNavigate } from "react-router-dom";
import { SpinnerButton } from "./Spinners";

const NewPost = ({
  handleSubmit,
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  submitError,
  submitLoading,
  setSubmitError,
}) => {
  const navigate = useNavigate();

  return (
    <main className="NewPost">
      {submitError && (
        <p className="error">
          <b>Error:</b> {submitError}
          <span
            onClick={() => {
              navigate(-1);
              setSubmitError(null);
            }}
          >
            Back
          </span>
        </p>
      )}
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          style={{ marginTop: "7px" }}
        />
        <button type="submit" disabled={submitLoading}>
          {submitLoading ? <SpinnerButton /> : "Submit"}
        </button>
      </form>
    </main>
  );
};

export default NewPost;
