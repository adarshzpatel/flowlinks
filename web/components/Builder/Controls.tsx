import React, { useState } from "react";

//React Icons
import { MdOutlineAdd, MdCheck, MdAdd } from "react-icons/md";

import { Disclosure, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import {
  SiGithub,
  SiGmail,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
  SiYoutube,
} from "react-icons/si";

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
};

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
}) => {
  const styles = {
    input:
      "bg-gray-800 text-gray-100 p-2 border border-gray-700 rounded-md focus:border-flow-700 outline-none ease-linear duration-150",
  };
  return (
    <div className='pt-8 overflow-y-scroll pr-8 flex flex-col space-y-4 select-none ease-linear duration-150'>
      <div className='relative flex flex-row space-x-8'>
        {/*Avatar Image */}
        <div
          className=' bg-gray-900 p-2 rounded-full flex flex-col cursor-pointer'
          data-te-input-wrapper-init
        >
          <div className='relative group'>
            <input
              type='file'
              className='absolute z-10 opacity-0 h-full w-full cursor-pointer'
              onChange={(e: any) => setAvatar(e.target.files[0])}
            />
            <div className='relative h-36 w-36 flex justify-center items-center bg-gray-900   text-gray-100 -ml-2 border-2 border-dashed border-gray-700 rounded-full group-hover:border-flow-700 outline-none ease-linear duration-150'>
              {avatar ? (
                <div className='flex flex-row items-center justify-center space-x-1 text-xs'>
                  <MdCheck size={20} className='text-flow-500' />
                  <div className=' text-flow-500'>Added</div>
                </div>
              ) : (
                <div className='flex flex-row items-center justify-center space-x-1 text-xs text-gray-500'>
                  <MdOutlineAdd size={20} />
                  <div className=' '>Add Avatar</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/*Names */}
        <div className='w-full flex space-y-2 flex-col'>
          {/*Display Name */}
          <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
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
          </div>
          {/*User Name */}
          <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
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
          </div>
        </div>
      </div>
      {/*Title  */}
      <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <label htmlFor='' className='text-gray-500 text-sm'>
          Title
        </label>
        <input
          type='text'
          placeholder='Eg. Full Stack Developer'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
      </div>

      {/*Bio Name */}
      <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <label htmlFor='' className='text-gray-500 text-sm'>
          Bio
        </label>
        <textarea
          placeholder='Enter Bio'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className={styles.input}
        />
      </div>
      {/*Social Links*/}
      <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <Disclosure>
          {({ open }: { open: boolean }) => (
            <>
              <Disclosure.Button
                as='div'
                className={`flex items-center hover:bg-gray-800/75 hover:rounded-md uppercase justify-between py-4 border rounded-md  border-gray-800 text-gray-400  px-4 `}
              >
                <div className=''>Add Social Links</div>
                <FiChevronDown
                  size={25} className={` ${open && "rotate-180"} duration-200 ease-out`}
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
                <Disclosure.Panel className='flex flex-col space-y-4 mt-4'>
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
        </Disclosure>
      </div>
      {/*Bio Name */}
      <div
        className='flex justify-between items-center hover:bg-gray-800/75 hover:rounded-md uppercase py-4 border rounded-md  border-gray-800 text-gray-400  px-4 cursor-pointer '
        data-te-input-wrapper-init
      >
        <div>ADD MORE LINKS</div>
        <div>
          <MdAdd
          size={25}
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
