import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSSRPostsState, handlePostState } from "../atoms/postAtoms";
import Input from "./Input";
import Post from "./Post";

const Feed = ({ posts }) => {
  const [realTimePosts, setRealTimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRealTimePosts(data);
      setHandlePost(false);
      setUseSSRPosts(false);
    };
    fetchData();
  }, [handlePost]);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/*Posts*/}
      {!useSSRPosts
        ? realTimePosts.map((post) => {
            return <Post key={post._id} post={post} />;
          })
        : posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
    </div>
  );
};

export default Feed;
