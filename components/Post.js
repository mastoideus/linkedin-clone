import React, { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  CloseRounded,
  CommentOutlined,
  DeleteRounded,
  MoreHorizRounded,
  ReplyRounded,
  ThumbUpOffAltRounded,
} from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { getPostState, handlePostState } from "../atoms/postAtoms";
import TimeAgo from "timeago-react";

const Post = ({ post, modalPost }) => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [showInput, setShowInput] = useState(false);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [liked, setLiked] = useState(false);

  const truncate = (string, n) => {
    return string?.length > n
      ? string.substr(0, n - 1) + "...see more"
      : string;
  };

  const deletePost = async () => {
    const response = await fetch(`/api/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <div
      className={`bg-white dark:bg-[#1D2226] space-y-2 border border-gray-300 dark:border-none py-2.5  ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      }`}
    >
      <div className="flex items-center p-x-2.5 cursor-pointer">
        <Avatar
          src={post.userImg}
          className="!h-10 !w-10 cursor-pointer ml-2"
        />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm opacity-80 dark:text-white/75">{post.email}</p>
          <TimeAgo
            datetime={post.createdAt}
            className="text-xs opacity-80 dark:text-white/75 "
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRounded className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRounded className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>

      {post.input && (
        <div className="px-2.5 break-all md:break-normal">
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)} className="">
              {post.input}
            </p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}

      {post.photoUrl && !modalPost && (
        <img
          onClick={() => {
            setModalType("gifYouUp");
            setPostState(post);
            setModalOpen(true);
          }}
          src={post.photoUrl}
          alt=""
          className="w-full cursor-pointer h-[350px]  object-cover"
        />
      )}
      <div
        className="flex justify-evenly items-center dark:border-t 
      border-gray-600/80 mx-2 text-black/60 dark:text-white/75 py-1"
      >
        {modalPost ? (
          <button className="postBtn">
            <CommentOutlined />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            onClick={() => setLiked(!liked)}
            className={`postBtn  ${liked && "text-blue-500"}`}
          >
            {liked ? (
              <ThumbUpOffAltRounded className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltRounded className="-scale-x-100" />
            )}
            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button onClick={deletePost} className="postBtn focus:text-red-400">
            <DeleteRounded />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="postBtn">
            <ReplyRounded className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
