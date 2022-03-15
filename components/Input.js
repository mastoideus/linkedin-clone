import React from "react";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import {
  Article,
  BusinessCenter,
  PhotoSizeSelectActual,
  VideoCameraBack,
} from "@mui/icons-material";

const Input = () => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div
      className="bg-white dark:bg-[#1D2226] rounded-lg p-3 
    space-y-3 border border-gray-300 dark:border-none"
    >
      <div className="flex items-center space-x-2">
        <Avatar src={session?.user?.image} className="!h-10 !w-10" />
        <motion.button
          onClick={() => {
            setModalOpen(true);
            setModalType("dropIn");
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 opacity-80 
          px-3 py-2.5 hover:opacity-100 font-medium w-full text-left "
        >
          Start a post
        </motion.button>
      </div>
      <div className="flex items-center flex-wrap justify-center gap-4 md:gap-x-10">
        <button className="inputBtn group">
          <VideoCameraBack className="text-green-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Video</h4>
        </button>
        <button className="inputBtn group">
          <BusinessCenter className="text-blue-300" />
          <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
        </button>
        <button className="inputBtn group">
          <PhotoSizeSelectActual className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
        </button>
        <button className="inputBtn group">
          <Article className="text-red-400" />
          <h4 className="opacity-80 group-hover:opacity-100 whitespace-nowrap">
            Write article
          </h4>
        </button>
      </div>
    </div>
  );
};

export default Input;
