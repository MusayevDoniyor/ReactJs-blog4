import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

import { useDispatch, useSelector } from "react-redux";
import { addPost, addPosts, deletePost } from "./store/postSlice";
import { api } from "./api/api.js";

import { SpinnerMain } from "./components/Spinners.jsx";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  // ! Errors
  const [fetchError, setFetchError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // ? Loadings
  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setFetchError(null);
    async function fetchPosts() {
      try {
        const response = await api.get("/posts");

        dispatch(addPosts(response.data));
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setFetchLoading(false);
      }
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    setSubmitLoading(true);
    setSubmitError(null);

    try {
      await api.post("/posts", newPost);
      dispatch(addPost(newPost));
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteError(null);
    setDeleteLoading(true);
    try {
      await api.delete(`posts/${id}`);
      dispatch(deletePost(id));
      navigate("/");
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      {fetchError && (
        <p className="error">
          <b>Error while fetching data:</b> {fetchError}
        </p>
      )}

      {fetchLoading && <SpinnerMain />}
      <Routes>
        <Route
          path="/"
          element={<Home posts={searchResults} fetchError={fetchError} />}
        />
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              submitError={submitError}
              submitLoading={submitLoading}
              setSubmitError={setSubmitError}
            />
          }
        />
        <Route
          path="/post/:id"
          element={
            <PostPage
              posts={posts}
              handleDelete={handleDelete}
              setDeleteError={setDeleteError}
              deleteError={deleteError}
              deleteLoading={deleteLoading}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" component={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
