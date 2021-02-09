import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import useSwr from "swr";
import PostCard from "../components/PostCard";

const Index = (initialData) => {
  const { data: posts } = useSwr("/posts", { initialData: initialData.posts });

  return (
    <>
      <Head>
        <title>readit: the frontpage of the internet</title>
      </Head>
      <div className="container flex pt-4">
        {/* Posts feed */}
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard key={post.identifier} post={post} />
          ))}
        </div>
        {/* SIdebar */}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const res = await axios.get("/posts");
    return { props: { posts: res.data } };
  } catch (err) {
    return { props: { error: "Something went wrong" } };
  }
};

export default Index;
