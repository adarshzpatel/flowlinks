import React, { useState } from "react";

//React Icons
import { MdOutlineAdd, MdCheck } from "react-icons/md";

import { Disclosure, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { SiGithub, SiGmail, SiInstagram, SiLinkedin, SiTwitter, SiYoutube } from "react-icons/si";

type Props = {
  displayName: string;
  setDisplayName: any;
  username: string;
  setUserName: any;
  cover: any;
  setCover: any;
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
  cover,
  setCover,
  avatar,
  setAvatar,
  bio,
  setBio,
}) => {
  return (
    <div className='p-8 flex flex-col space-y-4 select-none ease-linear duration-150'>
      {/*images */}
      <div className='relative flex flex-col mb-10 cursor-pointer'>
        {/*Cover Name */}
        <div
          className='relative  flex flex-col gap-2  '
          data-te-input-wrapper-init
        >
          <div className='relative group '>
            <input
              type='file'
              className='absolute z-10 opacity-0 h-full w-full cursor-pointer'
              onChange={(e: any) => setCover(e.target.files[0])}
            />
            <div className='relative  h-28 flex justify-center items-center bg-transparent  text-zinc-100 p-2 border-2 border-dashed  border-zinc-700 rounded-md group-hover:border-flow-700 outline-none ease-linear duration-150'>
              {cover ? (
                <div className='flex flex-row items-center justify-center space-x-1 text-xs'>
                  <MdCheck size={20} className='text-flow-500' />
                  <div className=' text-flow-500'>Added</div>
                </div>
              ) : (
                <div className='flex flex-row items-center justify-center space-x-1 text-xs text-zinc-500 '>
                  <MdOutlineAdd size={20} />
                  <div className=' '>Add Cover</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/*Avatar Image */}
        <div
          className='absolute top-12 left-6 bg-zinc-900 p-2 rounded-full flex flex-col gap-2 cursor-pointer'
          data-te-input-wrapper-init
        >
          <div className='relative group'>
            <input
              type='file'
              className='absolute z-10 opacity-0 h-full w-full cursor-pointer'
              onChange={(e: any) => setAvatar(e.target.files[0])}
            />
            <div className='relative h-28 w-28 flex justify-center items-center bg-zinc-900   text-zinc-100 p-2 border-2 border-dashed border-zinc-700 rounded-full group-hover:border-flow-700 outline-none ease-linear duration-150'>
              {avatar ? (
                <div className='flex flex-row items-center justify-center space-x-1 text-xs'>
                  <MdCheck size={20} className='text-flow-500' />
                  <div className=' text-flow-500'>Added</div>
                </div>
              ) : (
                <div className='flex flex-row items-center justify-center space-x-1 text-xs text-zinc-500'>
                  <MdOutlineAdd size={20} />
                  <div className=' '>Add Avatar</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*Display Name */}
      <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <label htmlFor='' className='text-zinc-500 text-sm'>
          Display Name
        </label>
        <input
          type='text'
          placeholder='Enter Name'
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className='bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md focus:border-flow-700 outline-none ease-linear duration-150'
        />
      </div>
      {/*User Name */}
      <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <label htmlFor='' className='text-zinc-500 text-sm'>
          User Name
        </label>
        <input
          type='text'
          placeholder='User Name'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className='bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md focus:border-flow-700 outline-none ease-linear duration-150'
        />
      </div>
      {/*Bio Name */}
      <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <label htmlFor='' className='text-zinc-500 text-sm'>
          Bio
        </label>
        <textarea
          placeholder='Enter Bio'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className='bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md focus:border-flow-700 outline-none ease-linear duration-150'
        />
      </div>
      {/*Social Links*/}
      <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <label htmlFor='' className='text-zinc-500 text-sm'>
          Social Links
        </label>
        <Disclosure>
          {({ open }: { open: boolean }) => (
            <>
              <Disclosure.Button
                as='div'
                className={`flex justify-between bg-zinc-800  cursor-pointer items-center text-base text-zinc-400 p-2 border  rounded-md outline-none ease-linear duration-150 ${open?'border-flow-500':'border-zinc-700'}`}
              >
                <div className=''>Add Social Links</div>
                <FiChevronDown
                  className={`h-4 w-4 ${
                    open && "rotate-180"
                  } duration-200 ease-out`}
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
                <Disclosure.Panel className='flex flex-col space-y-2'>
                  <div
                    className='flex flex-row items-center gap-2 bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiTwitter size={20} className="text-zinc-500"/>
                    <input
                      type='text'
                      placeholder='https://twitter.com/user_id'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-zinc-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiGithub size={20} className="text-zinc-500"/>
                    <input
                      type='text'
                      placeholder='https://github.com/user_id'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-zinc-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiLinkedin size={20} className="text-zinc-500"/>
                    <input
                      type='text'
                      placeholder='https://www.linkedin.com/in/user_id/'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-zinc-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiInstagram size={20} className="text-zinc-500"/>
                    <input
                      type='text'
                      placeholder='https://www.instagram.com/user_id/'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-zinc-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiYoutube size={20} className="text-zinc-500"/>
                    <input
                      type='text'
                      placeholder='https://www.youtube.com/c/xyz'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-zinc-100 '
                    />
                  </div>
                  <div
                    className='flex flex-row items-center gap-2 bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md  outline-none ease-linear duration-150 '
                    data-te-input-wrapper-init
                  >
                    <SiGmail size={20} className="text-zinc-500"/>
                    <input
                      type='text'
                      placeholder='abc@example.com'
                      //   value={username}
                      //   onChange={(e) => setUserName(e.target.value)}
                      className='w-full h-full bg-transparent outline-none text-zinc-100 '
                    />
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
      {/*Bio Name */}
      <div className='flex flex-col gap-2 ' data-te-input-wrapper-init>
        <label htmlFor='' className='text-zinc-500 text-sm'>
          Bio
        </label>
        <input
          type='text'
          placeholder='Enter Bio'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className='bg-zinc-800 text-zinc-100 p-2 border border-zinc-700 rounded-md focus:border-flow-700 outline-none ease-linear duration-150'
        />
      </div>
    </div>
  );
};

export default Controls;
