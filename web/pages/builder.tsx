import React, { useState } from "react";
import Container from "../layouts/Container";
import Controls from "../components/Builder/Controls";
import Preview from "../components/Builder/Preview";

const Builder = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [cover, setCover] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [bio, setBio] = useState<string>("");

  return (
    <Container>
      <div className='text-white grid grid-cols-2 section__height'>
          <Controls 
            displayName={displayName} 
            setDisplayName={setDisplayName} 
            username={username}
            setUserName={setUserName}
            cover={cover}
            setCover={setCover}
            avatar={avatar}
            setAvatar={setAvatar}
            bio={bio}
            setBio = {setBio}
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
