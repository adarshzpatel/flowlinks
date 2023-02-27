import React from "react";
import { useControls } from "../../store/useControls";
import Card from "./Card";

function Preview() {
  const bg = useControls((e) => e.userBgColor);
  const {
    displayName,
    username,
    userTheme,
    title,
    bio,
    twitter,
    github,
    linkedin,
    instagram,
    youtube,
    gmail,
    otherLinks,
    avatarStyle,
    cover,
    avatar,
  } = useControls();

  return (
    <div
      style={{ backgroundImage: bg }}
      className='flex items-center justify-center section__height fixed right-0 w-[50%]  ease-linear duration-150'
    >
      <Card
      minted={false}
      displayName={displayName}
      theme={userTheme}
      username={username}
      bio={bio}
      title={title}
      twitter={twitter}
      github={github}
      linkedin={linkedin}
      instagram={instagram}
      youtube={youtube}
      gmail={gmail}
      otherLinks={otherLinks}
      avatarStyle={avatarStyle}
      avatar={avatar}
      cover={cover}
      />
    </div>
  );
}

export default Preview;
