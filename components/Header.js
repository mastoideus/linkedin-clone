import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { SearchRounded } from "@mui/icons-material";
import inLogoBlack from "../public/images/inLogoBlack.png";
import inLogoBlue from "../public/images/inLogoBlue.png";
import HeaderLink from "./HeaderLink";
import Link from "next/link";
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
  const [openMeDropdown, setOpenMeDropdown] = useState(false);

  const openMeDropdownHandler = () => {
    setOpenMeDropdown((prevState) => !prevState);
  };

  const dropdownContent = (
    <div
      className="bg-gray-50 divide-y dark:divide-gray-500 overflow-ellipsis space-y-3 w-[320px] h-[340px] hidden md:inline-block 
    rounded-l-lg rounded-br-lg p-4  top-12 lg:top-14 right-0 absolute shadow-lg dark:bg-[#1D2226]  "
    >
      <div>
        <div className="flex items-center relative gap-x-3 max-w-[50px]">
          <Avatar className="relative -top-[10px]" />
          <div className="">
            <p className="font-semibold text-md">Anel Zubčević</p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p className="">Front-end developer |</p>
              <p className="">HTML,CSS,JavaScript,React.js,Next.js,Git</p>
            </div>
          </div>
        </div>
        <button
          className=" rounded-full w-[100%] font-semibold py-0 bg-white dark:bg-gray-300  mt-4 
        border border-blue-500 text-blue-600 hover:border-blue-700 "
        >
          <Link href="/profile">View Profile</Link>
        </button>
      </div>
      <div>
        <p className="font-semibold dark:text-gray-300">Account</p>
        <div className="text-sm text-gray-500">
          <p>Settings & Privacy</p>
          <p>Help</p>
          <p>Language</p>
        </div>
      </div>
      <div>
        <p className="font-semibold dark:text-gray-300">Manage</p>
        <div className="text-sm text-gray-500">
          <p>Posts</p>
          <p>Activity</p>
        </div>
      </div>
      <div>
        <button className="border-none outline-none dark:text-gray-300 ">
          Sign out
        </button>
      </div>
    </div>
  );

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
          <div className="relative">
            <HeaderLink
              Icon={Avatar}
              avatar
              text="Me"
              hidden
              feed
              onClick={openMeDropdownHandler}
              dropdown={openMeDropdown}
            />
            {openMeDropdown && dropdownContent}
          </div>
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
