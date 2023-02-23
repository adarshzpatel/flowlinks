import React, { useState } from "react";
import Container from "../layouts/Container";
import Controls from "../components/Builder/Controls";
import Preview from "../components/Builder/Preview";

const Builder = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [title, setTitle] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [bio, setBio] = useState<string>("");
  const [model, setModel] = useState<boolean>(false);

  return (
    <Container>
      <div className='text-white grid grid-cols-2 section__height'>
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
            setBio = {setBio}
            model={model}
            setModel={setModel}
          />
          <Preview 
            displayName={displayName}  
            username={username}
          />
      </div>
    </Container>
  );
};

export default Builder;
