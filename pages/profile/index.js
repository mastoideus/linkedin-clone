/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ProfileModal from "../../components/ProfileModal";
import { Create } from "@mui/icons-material";
import AddAPhotoTwoToneIcon from "@mui/icons-material/AddAPhotoTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import LightModeIcon from "@mui/icons-material/LightMode";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../components/Header";
import AdjustComponent from "../../components/AdjustComponent";

const ProfilePage = () => {
  const [backgroundImgModal, setBackgroundImgModal] = useState(false);
  const [adjustType, setAdjustType] = useState("");
  const [lightRange, setLightRange] = useState(1);
  const [zoomRange, setZoomRange] = useState(1);
  const [rotateRange, setRotateRange] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [confirmUrl, setConfirmUrl] = useState(false);
  const [imgObject, setImgObject] = useState();

  console.log(lightRange);
  console.log(zoomRange);
  console.log(rotateRange);

  const openBackgroundModalHandler = () => {
    setBackgroundImgModal(true);
  };
  const closeBackgroundModalHandler = () => {
    setBackgroundImgModal(false);
  };

  const adjustIconsHandler = (adjustType) => {
    setAdjustType(adjustType);
  };

  const adjustTypeBackHandler = () => {
    setAdjustType("");
  };

  const lightRangeHandler = (lightValue) => {
    setLightRange(lightValue);
  };
  const rotateRangeHandler = (rotateValue) => {
    setRotateRange(rotateValue);
  };
  const zoomRangeHandler = (zoomValue) => {
    setZoomRange(zoomValue);
  };
  const imageUrlHandler = (e) => {
    setImgUrl(e.target.value);
  };
  const confirmImgUrlHandler = () => {
    setConfirmUrl(true);
  };

  const submitRangesHandler = () => {
    const imageObject = {
      lValue: lightRange,
      rValue: rotateRange,
      zValue: zoomRange,
      imageUrl: imgUrl,
    };

    localStorage.setItem("imgObjectRanges", JSON.stringify(imageObject));

    setImgObject(imageObject);
    setBackgroundImgModal(false);
  };

  useEffect(() => {
    const imgValues = JSON.parse(localStorage.getItem("imgObjectRanges"));

    setImgObject(imgValues);
  }, []);

  let adjustContent;
  if (adjustType === "light") {
    adjustContent = (
      <AdjustComponent
        maxRange={1}
        adjustType={adjustType}
        onAdjustTypeBack={adjustTypeBackHandler}
        onChangeRange={lightRangeHandler}
        step
        range={lightRange}
        minLight="0"
      />
    );
  } else if (adjustType === "rotate") {
    adjustContent = (
      <AdjustComponent
        maxRange={360}
        adjustType={adjustType}
        onAdjustTypeBack={adjustTypeBackHandler}
        onChangeRange={rotateRangeHandler}
        range={rotateRange}
        minRot="0"
      />
    );
  } else if (adjustType === "zoom") {
    adjustContent = (
      <AdjustComponent
        maxRange={4}
        adjustType={adjustType}
        onAdjustTypeBack={adjustTypeBackHandler}
        onChangeRange={zoomRangeHandler}
        range={zoomRange}
      />
    );
  }
  return (
    <React.Fragment>
      {backgroundImgModal && (
        <ProfileModal
          onClose={closeBackgroundModalHandler}
          backgroundImgModal={backgroundImgModal}
        >
          <header
            className="flex justify-between p-4 items-center border-b 
          border-gray-400 bg-black text-lg text-white/75"
          >
            <h2>Background Image</h2>
            <CloseIcon onClick={closeBackgroundModalHandler} />
          </header>
          <div className=" dark:bg-[#1D2226] bg-white p-4 h-[80%] ">
            <div
              className={`h-[260px] mb-2 overflow-hidden ${
                imgObject?.imgUrl === "" &&
                "flex items-center justify-center text-lg"
              }`}
            >
              {imgObject && !confirmUrl ? (
                <div className="text-center flex flex-col space-y-3 px-20 py-20">
                  <h2 className="font-semibold text-gray-400 mb-4">
                    Set Image url
                  </h2>

                  <input
                    type="text"
                    value={imgUrl}
                    onChange={imageUrlHandler}
                    className="rounded-lg border border-black/75 dark:border-white/75 focus:border-blue-500"
                  />
                  <button
                    onClick={confirmImgUrlHandler}
                    className="font-semibold text-gray-700 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 p-1"
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <img
                  style={{
                    opacity: lightRange && `${lightRange}`,

                    transform: `rotate(${rotateRange}deg) scale(${zoomRange}, ${zoomRange}) `,
                  }}
                  src={imgUrl && imgUrl}
                  alt=""
                  className={`h-[100%] w-[100%]`}
                />
              )}
            </div>
            {adjustType === "" ? (
              <div className="flex items-center justify-center pt-6 gap-10">
                <div
                  className=" adjustBgIcon"
                  onClick={() => adjustIconsHandler("light")}
                >
                  <LightModeIcon className="dark:text-white/75 text-black/75" />
                </div>
                <div
                  className=" adjustBgIcon"
                  onClick={() => adjustIconsHandler("rotate")}
                >
                  <CameraswitchIcon className="dark:text-white/75 text-black/75" />
                </div>
                <div
                  className=" adjustBgIcon"
                  onClick={() => adjustIconsHandler("zoom")}
                >
                  <ZoomInIcon className="dark:text-white/75 text-black/75" />
                </div>
              </div>
            ) : (
              adjustContent
            )}
          </div>
          <footer className="flex justify-between items-center p-4 bg-white text-black/75 border-t border-gray-400 ">
            <button className=" rounded-sm hover:bg-gray-100 p-1">
              Delete photo
            </button>
            <div className="space-x-3">
              <button
                className="rounded-sm hover:bg-gray-100 p-1"
                onClick={() => setConfirmUrl(false)}
              >
                Change photo
              </button>
              <button
                onClick={submitRangesHandler}
                className="bg-blue-700 text-blue-50 py-1 px-3 rounded-full"
              >
                Apply
              </button>
            </div>
          </footer>
        </ProfileModal>
      )}

      <Header />
      <div className="sm:p-3  dark:bg-black  md:flex md:justify-around lg:px-20 xl:px-48  space-x-4 ">
        <div>
          <div className=" profileContainer pb-3 md:mt-6 dark:border-b-[1px] dark:border-b-blue-900  ">
            <div
              className={` relative w-[100%] h-[150px] overflow-hidden ${
                imgObject?.imgUrl === "" &&
                "flex items-center justify-center bg-gray-200 dark:bg-gray-800"
              }`}
            >
              {imgObject?.imgUrl === "" ? (
                <h2 className=" font-semibold text-gray-400 text-lg">
                  Add background image
                </h2>
              ) : (
                <img
                  src={imgObject && imgObject.imageUrl}
                  alt=""
                  className=" object-cover w-[100%] h-[100%]"
                  style={{
                    opacity: imgObject && imgObject.lValue,
                    transform:
                      imgObject &&
                      `rotate(${imgObject.rValue}deg) scale(${imgObject.zValue},${imgObject.zValue})`,
                  }}
                />
              )}
              <div
                className=" absolute right-2 top-8 rounded-full bg-white
             hover:bg-white/75 p-1 dark:bg-white/75 dark:hover:bg-white"
              >
                <Create
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={openBackgroundModalHandler}
                />
              </div>
            </div>
            <div
              className="w-40 h-40 bg-white dark:bg-[#1D2226]   flex 
          justify-center items-center rounded-full ml-6 -mt-28 relative"
            >
              <AddAPhotoTwoToneIcon className=" text-4xl dark:text-blue-200 " />
            </div>

            <div className="mx-6 my-4 ">
              <h2 className="text-2xl font-semibold">Anel Zubčević</h2>
              <p className=" text-gray-800 dark:text-gray-500 text-md">
                Front-end developer | HTML, CSS, JavaScript, React, Nextjs,
                Git(vesion control)
              </p>
              <div className=" space-y-2 mt-3 text-sm text-gray-500 dark:text-white/75">
                <p>Available</p>
                <p>
                  Sarajevo, Federation of Bosnia and Herzegovina{" "}
                  <span className=" text-blue-700 font-semibold">
                    Contact info
                  </span>
                </p>
                <p className="text-blue-700 font-semibold">18 connections</p>
              </div>
              <div className="flex space-x-3 items-center mt-5">
                <button className="profileBtn">Open to</button>
                <button className="profileBtn bg-white border border-blue-400 text-blue-700">
                  Add Profile section
                </button>
                <div className="rounded-full bg-gray-100 dark:bg-[#1D2226] p-1">
                  <MoreHorizTwoToneIcon />
                </div>
              </div>

              <div className="md:flex items-center gap-2">
                <div className="mt-6 bg-black/10 p-2 flex-1 md:rounded-md dark:bg-gray-800">
                  <h3 className="font-semibold dark:text-gray-500">
                    Open to work
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-white/75">
                    Frontend Developer roles
                  </p>
                  <p className="text-blue-700 font-semibold text-sm">
                    See all details
                  </p>
                </div>
                <div className="hidden md:inline-block flex-1 border border-black/10 p-2 mt-6 md:rounded-md dark:border-gray-800">
                  <p className="text-sm">
                    <span className="font-semibold dark:text-gray-500">
                      Share that you are hiring
                    </span>{" "}
                    and <br></br> attract qualified candidates.
                  </p>
                  <p className="text-blue-700 font-semibold text-sm">
                    Get started
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="profileContainer mt-6 p-6 text-2xl font-bold text-gray-800 dark:text-white/90">
            Sugested for you
            <span className="flex text-gray-500 font-light items-center mb-6  ">
              <RemoveRedEyeIcon className="text-sm mr-1" />
              <p className="text-sm">Private to you</p>
            </span>
            <div className="font-normal text-sm flex flex-col space-y-2">
              <h2 className="font-semibold text-lg">Beginner</h2>
              <div className="h-2 w-[100%] bg-gray-300 rounded-lg overflow-hidden">
                <div className="w-[40%] h-[100%] bg-gray-700"></div>
              </div>
              <p className="text-gray-500 dark:text-white/75">
                Complete 1 step to achieve {""}
                <span className="text-blue-700 font-semibold hover:underline cursor-pointer ">
                  Intermediate
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[350px]">
          <div
            className=" flex-col items-center   rounded-lg p-3 bg-white/75 dark:bg-black dark:divide-gray-700 
        border dark:border-gray-700  hidden md:inline-block md:mt-6  w-[100%] shadow-md "
          >
            <div className="flex items-center justify-between text-gray-500 p-3  font-semibold text-md ">
              <p>Edit public profile & URL</p>
              <p>?</p>
            </div>
            <div className="flex items-center border-t-[1px]  justify-between text-gray-500 p-3 font-semibold  text-md">
              <p>Add profile in another Language</p>
              <p className="">?</p>
            </div>
          </div>
          <div className=" sticky top-20 px-6 border dark:border-gray-600 hidden pt-[6px] dark:pt-1 md:block w-[100%]  rounded-lg shadow-md">
            <Image
              src="https://imageio.forbes.com/specials-images/imageserve/6063d051926c75ddb9a9cbd7/In-this-photo-illustration-a-LinkedIn-logo-of-business-and---/960x0.jpg?fit=bounds&format=jpg&width=960"
              width={330}
              objectFit="fill"
              alt=""
              height={230}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfilePage;
