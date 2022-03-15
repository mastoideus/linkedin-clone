import { FiberManualRecordRounded, InfoRounded } from "@mui/icons-material";
import React from "react";
import TimeAgo from "timeago-react";
import Image from "next/image";

const Widgets = ({ articles }) => {
  return (
    <div className="hidden xl:inline space-y-2">
      <div
        className="bg-white dark:bg-[#1D2226] py-2.5 
      rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none"
      >
        <div className="flex items-center justify-between px-2 font-bold">
          <h4>LinkedIn news</h4>
          <InfoRounded className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          {articles.slice(0, 5).map((article) => {
            return (
              <div
                key={article.url}
                className="flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 py-4 px-2 "
              >
                <FiberManualRecordRounded className="!h-2 !w-2" />
                <div>
                  <h5 className="max-w-xs font-medium text-sm truncate pr-10">
                    {article.title}
                  </h5>
                  <TimeAgo
                    datetime={article.publishedAt}
                    className="text-xs mt-0.5 opacity-80 dark:text-white/75"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="bg-white dark:bg-[#1D2226] sticky 
      top-20 w-11/12 h-64 rounded-lg px-2.5 border border-gray-300 dark:border-none"
      >
        <div className="relative w-full h-full">
          <Image
            src="http://rockcontent.com/wp-content/uploads/2021/11/linkedin-ad-examples.png"
            layout="fill"
            objectFit="contain"
            alt=""
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Widgets;
