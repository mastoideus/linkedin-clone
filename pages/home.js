import React from "react";
import Image from "next/image";
import linkedInLogo from "../public/images/linkedInLogo.png";
import HeaderLink from "../components/HeaderLink";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import { OndemandVideoSharp } from "@mui/icons-material";
import { BusinessCenter } from "@mui/icons-material";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import homeImg from "../public/images/homeImg.png";
import Head from "next/head";
import { signIn } from "next-auth/react";

const Home = () => {
  return (
    <div className="space-y-10 relative">
      <Head>
        <title>LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-around items-center py-4 ">
        <div className=" relative w-36 h-10">
          <Image src={linkedInLogo} alt="" layout="fill" objectFit="contain" />
        </div>
        <div className="flex items-center sm:divide-x-2 divide-gray-300">
          <div className=" hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={OndemandVideoSharp} text="Learning" />
            <HeaderLink Icon={BusinessCenter} text="Jobs" />
          </div>
          <div className="pl-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="text-blue-700 px-5 rounded-full ml-1 font-semibold  border border-blue-700 py-1.5 transition-all hover:border-2"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto ">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">
            Welcome to your professional Community
          </h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRounded className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRounded className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRounded className="text-gray-700" />
            </div>
          </div>
        </div>

        <div className="relative w-[500px] h-[500px] xl:w-[600px] xl:h-[600px] xl:absolute top-14 right-5">
          <Image src={homeImg} alt="" layout="fill" objectFit="contain" />
        </div>
      </main>
    </div>
  );
};

export default Home;
