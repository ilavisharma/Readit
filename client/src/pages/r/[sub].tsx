import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import PostCard from "../../components/PostCard";

const Sub = (initialData) => {
  const router = useRouter();
  const subName = router.query.sub;

  const { data: sub, error } = useSWR(subName ? `/sub/${subName}` : null, {
    initialData: initialData.sub,
  });

  if (error) router.push("/");

  let postsMarkup;
  if (!sub) {
    postsMarkup = <p className="text-lg text-center">Loading...</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = <p className="text-lg text-center">No posts submitted yet</p>;
  } else {
    postsMarkup = sub.posts.map((post) => (
      <PostCard key={post.identifier} post={post} />
    ));
  }

  return (
    <div className="container flex pt-5">
      {sub && <div className="w-160">{postsMarkup}</div>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const subName = context.params.sub;
    const res = await axios.get(`/sub/${subName}`);
    return { props: { sub: res.data } };
  } catch (err) {
    return { props: { error: "Something went wrong" } };
  }
};

export default Sub;
