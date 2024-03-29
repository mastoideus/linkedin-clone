import React from "react";
import Link from "next/link";

const HeaderLink = ({
  Icon,
  text,
  avatar,
  feed,
  active,
  hidden,

  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${
        hidden && "hidden md:inline-flex"
      } cursor-pointer flex flex-col justify-center items-center 
    ${
      feed
        ? "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1"
        : "text-gray-500 hover:text-gray-700"
    } ${active && "text-black dark:text-white"}`}
    >
      {avatar ? <Icon className="!h-7 !w-7 lg:!-mb-1" /> : <Icon />}
      <h4
        className={` text-sm  ${
          feed && "hidden lg:flex justify-center w-full "
        }`}
      >
        {text}
      </h4>

      {active && (
        <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white dark:-mt-2 rounded-t-full"></span>
      )}
    </div>
  );
};

export default HeaderLink;
