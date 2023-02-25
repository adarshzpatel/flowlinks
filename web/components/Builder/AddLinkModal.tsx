import React from 'react'
//import {Modal} from "@mantine/core"
import Button from '../ui/Button'
import { TextInput} from '@mantine/core';
import { useState } from 'react';
import { Modal,Group } from '@mantine/core';
import { LinkType } from "../../pages/builder";
type Props={setOtherLinks:any,otherLinks:LinkType[]}
function AddLinkModal({setOtherLinks,otherLinks}:Props) {
  const [opened, setOpened] = useState(false);
const[title,setTitle]=useState<string>("");
const [href, sethref] = useState<string>("");
//const [otherLinks,setOtherLinks] = useState<LinkType[]>([
  //{href:"test",
//title:"Title"}
//])
const addNewLink = (title:string,href:string) => {
  const newLink = {
    title:title,
    href:href
    }
  setOtherLinks([...otherLinks,newLink])
}
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="title"
      >
  <TextInput label="Title" 
  value={title}
             onChange={(e) => setTitle(e.target.value)}
              placeholder="Eg. YouTube" data-autofocus />
    <TextInput label="Link"
     value={href}
     onChange={(e) =>sethref (e.target.value)}
    placeholder="Eg. https://www.youtube.com/c/xys" data-autofocus />
  {/* {otherLinks.map((item,idx)=> (<div>{item.title},{item.href}</div>))}*/}
    <Button onClick={() => addNewLink(title,href)}>Add new link</Button>          
      </Modal>

      <Group position="left">
    
        <Button onClick={() => setOpened(true)}>Add new link</Button>
        
      </Group>
    </>
  );
}

export default AddLinkModal