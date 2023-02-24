import React, { useState } from "react";
import { Transition } from "@headlessui/react";

import Container from "../layouts/Container";
import Controls from "../components/Builder/Controls";
import Preview from "../components/Builder/Preview";
import Card_Controls from "../components/Builder/Card_Controls";

const Builder = () => {
  const [tab, setTab] = useState("Details");

  //Controls
  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [title, setTitle] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [bio, setBio] = useState<string>("");
  const [model, setModel] = useState<boolean>(false);

  //Card_Controls
  const [avatarStyle, setAvatarStyle] = useState("rounded-lg");

  return (
    <Container>
      <div className=' text-white grid grid-cols-2 section__height'>
        <div>
          <div className='flex flex-row max-w-min space-x-2 p-2 mt-4 mr-8 rounded-md bg-gray-800/50 border-gray-800 select-none'>
            <button
              className={`hover:bg-gray-700/80 rounded-md ease-linear duration-150 p-1 px-4
              ${tab === "Details" ? "bg-gray-700/80" : ""}`}
              onClick={() => setTab("Details")}
            >
              Details
            </button>
            <button
              className={`hover:bg-gray-700/80 rounded-md ease-linear duration-150 p-1 px-4
             ${tab === "Themes" ? "bg-gray-700/80" : ""}`}
              onClick={() => setTab("Themes")}
            >
              Themes
            </button>
          </div>
          <Transition
            show={tab === "Details"}
            enter='transition-opacity ease-linear duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Controls
              displayName={displayName}
              setDisplayName={setDisplayName}
              username={username}
              setUserName={setUserName}
              title={title}
              setTitle={setTitle}
              avatar={avatar}
              setAvatar={setAvatar}
              bio={bio}
              setBio={setBio}
              model={model}
              setModel={setModel}
            />
          </Transition>
          <Transition
            show={tab === "Themes"}
            enter='transition-opacity ease-linear duration-150'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Card_Controls/>
          </Transition>
        </div>
        <Preview/>
      </div>
    </Container>
  );
};

export default Builder;
