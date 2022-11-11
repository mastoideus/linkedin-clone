import React from "react";
import ProfileBackdrop from "./ProfileBackdrop";

const ProfileModal = ({ children, onClose, backgroundImgModal }) => {
  return (
    <React.Fragment>
      <ProfileBackdrop
        onClose={onClose}
        backgroundImgModal={backgroundImgModal}
      />
      <div
        className=" max-w-[600px] w-[100%]  rounded-lg 
      overflow-hidden border  z-[100] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default ProfileModal;
