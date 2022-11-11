import React from "react";
import { motion } from "framer-motion";

const ProfileBackdrop = ({ onClose, backgroundImgModal }) => {
  return (
    <motion.div
      className="fixed z-[50] top-0 left-0 w-screen h-screen bg-black/75"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ></motion.div>
  );
};

export default ProfileBackdrop;
