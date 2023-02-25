import React, { Dispatch, SetStateAction, useState } from "react";
import AddLinkModal from "./AddLinkModal";
import { Accordion } from "@mantine/core";
import { IconPlus } from '@tabler/icons';

//React Icons
import { MdOutlineAdd, MdCheck, MdAdd } from "react-icons/md";
import {TextInput} from '@mantine/core'
import { Textarea } from '@mantine/core';
import { Disclosure, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import {TbBrandTwitter} from 'react-icons/tb'
import {
  SiGithub,
  SiGmail,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
  SiYoutube,
} from "react-icons/si";

import { LinkType } from "../../pages/builder";
import { link } from "fs";
import Button from "../ui/Button";

type Props = {
  displayName: string;
  setDisplayName: any;
  username: string;
  setUserName: any;
  title: any;
  setTitle: any;
  avatar: string;
  setAvatar: any;
  bio: string;
  setBio: any;
  model: boolean;
  setModel: any;
  otherLinks:LinkType[]
  setOtherLinks: Dispatch<SetStateAction<LinkType[]>>
};

//TODO

// -- add accordion 
    // -- social media links 

// Other links 
// -- list of already added links 
// add new link button -> Modal -> input title and href , add link btn -> append to links list 


// spread operator , destructuring , promise ,async await


const Controls: React.FC<Props> = ({
  displayName,
  setDisplayName,
  username,
  setUserName,
  title,
  setTitle,
  avatar,
  setAvatar,
  bio,
  setBio,
  model,
  setModel,
  otherLinks,
  setOtherLinks
}) => {


  const addNewLink = (title:string,href:string) => {
    const newLink = {
      title:title,
      href:href
      
    }
    setOtherLinks([...otherLinks,newLink])
  }
  const styles = {
    input:
      "bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md focus:border-flow-700 outline-none ease-linear duration-150",
  };
  return (
    <div className='pt-8 overflow-y-scroll pr-8 flex flex-col space-y-4 select-none ease-linear duration-150'>
      <div className='relative flex flex-row space-x-8'>

        {/*Names */}
        <div className='w-full flex space-y-2 flex-col'>
          {/*Display Name */}
          {/* <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
            <label htmlFor='' className='text-gray-500 text-sm'>
              Display Name
            </label>
            <input
              type='text'
              placeholder='Enter Name'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={styles.input}
            />
          </div> */}
          
          <TextInput label="Display Name" placeholder="Enter display name" value={displayName} onChange={(e)=>setDisplayName(e.target.value)} />
          {/*User Name */}
         {/* <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
            <label htmlFor='' className='text-gray-500 text-sm'>
              User Name
            </label>
            <input
              type='text'
              placeholder='User Name'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className={styles.input}
            />
        </div>*/}
        
        <TextInput label="User Name" placeholder="Enter User name" value={username} onChange={(e)=>setUserName(e.target.value)} />
        </div>
      </div>
      {/*Title  */}
     {/* <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <label htmlFor='' className='text-gray-500 text-sm'>
          Title
        </label>
        <input
          type='text'
          placeholder='Eg. Full Stack Developer'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.TextInput}
        />
      </div>*/}
<TextInput label="Title" placeholder="Eg. Full Stack Developer" value={title} onChange={(e)=>setTitle(e.target.value)} />
   
      {/*Bio Name */}
     {/* <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <label htmlFor='' className='text-gray-500 text-sm'>
          Bio
        </label>
        <textarea
          placeholder='Enter Bio'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className={styles.TextInput}
        />
    </div>*/}
     <Textarea
      placeholder="Enter bio"
      label="Bio"
      withAsterisk
    />
      {/*Social Links*/}
      <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>

      <Accordion defaultValue="customization" >
      <Accordion.Item value="customization">
        <Accordion.Control >Add New Links</Accordion.Control>
        <Accordion.Panel>
        <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
        <SiTwitter size={20} className='text-gray-500' />
        <input type='text' placeholder='https://twitter.com/' className='w-full h-full bg-transparent outline-none text-gray-100 '
            /></div>
             <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
          <SiGithub size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='https://github.com/user_id'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />        
                     </div>
                     <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >

                     <SiLinkedin size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='https://www.linkedin.com/in/user_id/'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />
                    </div>
                    <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                     <SiInstagram size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='https://www.instagram.com/user_id/'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />
                    </div>
                     <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                        <SiYoutube size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='https://www.youtube.com/c/xyz'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    /></div>
                     <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiGmail size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='abc@example.com'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />
                  </div>
        </Accordion.Panel>
      </Accordion.Item>
      </Accordion>
       {/* <Disclosure>
          {({ open }: { open: boolean }) => (
            <>
              <Disclosure.Button
                as='div'
                className={`flex items-center hover:bg-gray-800/75 hover:rounded-md uppercase justify-between py-4 border rounded-md  border-gray-800 text-gray-400  px-4 `}
              >
                <div className=''>Add Social Links</div>
                <FiChevronDown
                  size={25}
                  className={` ${open && "rotate-180"} duration-200 ease-out`}
                />
              </Disclosure.Button>

              <Transition
                enter='transition duration-100 '
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-100'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >




                
              {/*  <Disclosure.Panel className='flex flex-col space-y-4 mt-4'>
                  <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiTwitter size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='https://twitter.com/user_id'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiGithub size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='https://github.com/user_id'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiLinkedin size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='https://www.linkedin.com/in/user_id/'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiInstagram size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='https://www.instagram.com/user_id/'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiYoutube size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='https://www.youtube.com/c/xyz'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiGmail size={20} className='text-gray-500' />
                    <input
                      type='text'
                      placeholder='abc@example.com'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-gray-100 '
                    />
                  </div>
          </Disclosure.Panel>

                
              </Transition>
            </>
          )}
          </Disclosure>*/}
          </div>
      {/*Bio Name*/ }
      <div
        className='flex justify-between items-center hover:bg-gray-800/75 hover:rounded-md uppercase py-4 border rounded-md  border-gray-800 text-gray-400  px-4 cursor-pointer '
        data-te-input-wrapper-init
        onClick={() => setModel(!model)}
      >
        <div>ADD MORE LINKS</div>
        <div>
          <MdAdd size={25} />
        </div>
      
      </div>
      <div className="p-4 ">
      
        <button>add link</button>


      
        {otherLinks.map((item,idx)=> (<div>{item.title},{item.href}</div>))}
        <Button onClick={()=>addNewLink("Test2","https://test")}>Add new link</Button>
        <AddLinkModal setOtherLinks={setOtherLinks} otherLinks={otherLinks}/>
      </div>
    </div>
  
  );
};

export default Controls;
