import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { SearchRounded } from "@mui/icons-material";
import inLogoBlack from "../public/images/inLogoBlack.png";
import inLogoBlue from "../public/images/inLogoBlue.png";
import HeaderLink from "./HeaderLink";
import GroupIcon from "@mui/icons-material/Group";
import { Avatar } from "@mui/material";
import { motion } from "framer-motion";

import {
  HomeRounded,
  BusinessCenter,
  Chat,
  Notifications,
  AppsOutlined,
} from "@mui/icons-material";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Header = () => {
  const [mounted, setMounted] = useState();
  const { setTheme, resolvedTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("current theme is " + theme);
  return (
    <header
      className="sticky top-0 z-40 bg-white dark:bg-[#1D2226]  
    flex justify-around items-center py-1 px-2 dark:py-1.5 focus-within:shadow-lg"
    >
      <div className="flex items-center space-x-2 w-full max-w-xs">
        <Image src={inLogoBlue} width={45} height={45} alt="" />

        <div className="flex items-center space-x-1 md:bg-gray-200 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRounded />
          <input
            type="text"
            placeholder="Search"
            className="hidden md:inline-flex bg-transparent 
            text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow "
          />
        </div>
      </div>

      <div className="flex items-center divide-x divide-gray-500">
        <div className="flex items-center space-x-6 pr-4">
          <HeaderLink Icon={HomeRounded} text="Home" feed active />
          <HeaderLink Icon={GroupIcon} text="My Network" feed />
          <HeaderLink Icon={BusinessCenter} text="Jobs" feed hidden />
          <HeaderLink Icon={Chat} text="Messaging" feed />
          <HeaderLink Icon={Notifications} text="Notifications" feed />
          <HeaderLink Icon={Avatar} avatar text="Me" hidden feed />
        </div>
        <div className="pl-8 pr-6">
          <HeaderLink Icon={AppsOutlined} text="Work" feed hidden />
        </div>

        {/*dark mode toggle*/}
        {mounted && (
          <div
            className={`flex items-center bg-gray-500 rounded-full h-6 px-0.5 w-12 cursor-pointer ${
              resolvedTheme === "dark" ? "justify-end" : "justify-start"
            } flex-shrink-0 relative`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="absolute left-1.5 text-yellow-300">L</span>
            <motion.div
              layout
              transition={spring}
              className="w-5 h-5 bg-white rounded-full z-40"
            />
            <span className="absolute right-1.5">D</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
