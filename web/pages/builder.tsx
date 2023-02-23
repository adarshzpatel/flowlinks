import React, { useState } from "react";
import Container from "../layouts/Container";
import Controls from "../components/Builder/Controls";
import Preview from "../components/Builder/Preview";


export type LinkType = {
  title: string 
  href: string 
}

const Builder = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [title, setTitle] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [bio, setBio] = useState<string>("");
  const [model, setModel] = useState<boolean>(false);
  const [otherLinks,setOtherLinks] = useState<LinkType[]>([
    {href:"test",
  title:"Title"}
  ])

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
            otherLinks={otherLinks}
            setOtherLinks={setOtherLinks}
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
