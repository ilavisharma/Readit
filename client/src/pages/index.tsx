import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

import { Post } from "../types";
import PostCard from "../components/PostCard";

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch(console.log);
  }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>readit: the frontpage of the internet</title>
      </Head>
      <div className="container flex pt-4">
        {/* Posts feed */}
        <div className="w-160">
          {posts.map((post) => (
            <PostCard key={post.identifier} post={post} />
          ))}
        </div>
        {/* SIdebar */}
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await axios.get("/posts");
//     return { props: { posts: res.data } };
//   } catch (err) {
//     return { props: { error: "Something went wrong" } };
//   }
// };

export default Index;
