import Feed from "./Feed";

const Home = ({ posts, fetchError }) => {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : fetchError ? null : (
        <p style={{ marginTop: "2rem" }}>No posts to display.</p>
      )}
    </main>
  );
};

export default Home;
