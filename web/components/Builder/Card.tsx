import React from "react";
import { LinkType } from "../../flow/types";
import { useControls } from "../../store/useControls";
import OtherLink from "./OtherLink";
import SocialLink from "./SocialLink";

type Props = {
  displayName: string;
  theme: string;
  username: string;
  bio: string;
  title: string;
  twitter: string;
  github: string;
  linkedin: string;
  instagram: string;
  youtube: string;
  gmail: string;
  otherLinks:LinkType[];
  avatarStyle:string;
  avatar:string,
  cover:string
};

const Card: React.FC<Props> = ({
  displayName,
  theme,
  username,
  bio,
  title,
  twitter,
  github,
  linkedin,
  instagram,
  youtube,
  gmail,
  otherLinks,
  avatarStyle,
  avatar,
  cover,
}) => {

  const themeData = theme.split(" ");
  const userTheme = {
    c1: themeData[0],
    c2: themeData[1],
    c3: themeData[2],
    c4: themeData[3],
  };

  return (
    <div
      style={userTheme && { backgroundColor: userTheme.c4 }}
      className={`max-w-sm w-full shadow-2xl shadow-black/60 p-4 rounded-lg ease-linear duration-150 bg-gray-800/50 `}
    >
      {/*Cover and Avatar */}
      <div className='relative mb-10 flex items-center justify-center select-none'>
        <div className=' h-40 rounded-md w-full  bg-fixed shadow-2xl'>
          <img
            src={
              cover ||
              "https://blog.pixlr.com/wp-content/uploads/2021/09/Pixlr-NFT-Art-Glitched-Vaporwave-3-1536x888.png"
            }
            className='h-full w-full rounded-md -z-10'
            alt='Cover'
          />
          <div className=' absolute top-0 w-full h-full rounded-md bg-gradient-to-t from-gray-900/80 via-gray-900/0 to-gray-900/0'></div>
        </div>
        <div
          className={`h-24 w-24 absolute ${avatarStyle} -bottom-6 bg-gray-700 shadow-xl`}
        >
          <img
            src={
              avatar ||
              "https://avatarfiles.alphacoders.com/169/thumb-169513.png"
            }
            className={`h-full w-full  ${avatarStyle}`}
            alt='Cover'
          />
        </div>
      </div>
      {/*Name / user id / Des */}
      <div
        style={userTheme && { backgroundColor: userTheme.c3 }}
        className={`flex flex-col rounded-md w-full bg-gray-800/50 p-4 ease-linear duration-150`}
      >
        {/*Display Name */}
        <div className='text-gray-50 text-2xl font-semibold text-center leading-5'>
          {displayName === "" ? "Your Name" : displayName}
        </div>
        {/*User Name */}
        <div className='text-gray-400 text-base text-center flex flex-row space-x-2 justify-center'>
          <div
            style={userTheme && { color: userTheme.c2 }}
            className='text-gray-400'
          >
            {username === "" ? "@username" : "@" + username}
          </div>
          <div
            style={userTheme && { color: userTheme.c2 }}
            className='text-gray-400'
          >
            | {title === "" ? "title_here" : title}
          </div>
        </div>
        {/*Description */}
        <div
          style={userTheme && { color: userTheme.c1 }}
          className='text-gray-300 text-base text-center pt-2'
        >
          {bio === "" ? "Your Desciption Goes here" : bio}
        </div>
      </div>
      {/*Social Links*/}
      <div className='flex flex-row  justify-between mt-2 gap-2'>
        <SocialLink
          userTheme={userTheme}
          title='Twitter'
          link={twitter ? twitter : "#"}
        />
        <SocialLink
          userTheme={userTheme}
          title='Github'
          link={github ? github : "#"}
        />
        <SocialLink
          userTheme={userTheme}
          title='Linkedin'
          link={linkedin ? linkedin : "#"}
        />
        <SocialLink
          userTheme={userTheme}
          title='Instagram'
          link={instagram ? instagram : "#"}
        />
        <SocialLink
          userTheme={userTheme}
          title='Youtube'
          link={youtube ? youtube : "#"}
        />
        <SocialLink
          userTheme={userTheme}
          title='Gmail'
          link={gmail ? gmail : "#"}
        />
      </div>
      {/*Other Links */}
      <div className='flex flex-col'>
        {otherLinks.map((e, i) => {
          return <OtherLink key={i} userTheme={userTheme} title={e.title} link={e.href} />;
        })}
        {/* {otherLinks?.length === 0 && <>
          <OtherLink title={"Example Link"} link={"#"}/>
          <OtherLink title={"Example Link"} link={"#"}/>
        </>} */}
      </div>
    </div>
  );
};

export default Card;
