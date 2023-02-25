import React, { Dispatch, SetStateAction, useState } from "react";
import AddLinkModal from "./AddLinkModal";
import { Accordion } from "@mantine/core";

//React Icons
import {
  MdOutlineAdd,
  MdCheck,
  MdAdd,
  MdOutlineClose,
  MdDelete,
} from "react-icons/md";
import { TextInput } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { Disclosure, Transition } from "@headlessui/react";
import { FiChevronDown, FiLink } from "react-icons/fi";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandYoutube,
  TbMail,
} from "react-icons/tb";
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
import { useControls } from "../../store/useControls";
import OtherLink from "./OtherLink";
import { mintNFT } from "../../flow/transactions";
import { useAmp } from "next/amp";
import { useAuth } from "../../context/AuthContext";

//TODO

// -- add accordion
// -- social media links

// Other links
// -- list of already added links
// add new link button -> Modal -> input title and href , add link btn -> append to links list

// spread operator , destructuring , promise ,async await

const InfoControls = () => {
  const {
    displayName,
    username,
    title,
    bio,
    twitter,
    github,
    linkedin,
    instagram,
    youtube,
    gmail,
    otherLinks,
    setTwitter,
    setGithub,
    setLinkedin,
    setInstagram,
    setYoutube,
    setGmail,
    setDisplayName,
    setUserName,
    setTitle,
    setBio,
    deleteOtherLink,
  } = useControls();

  const [openNewLinkModal, setOpenNewLinkModal] = useState<boolean>(false);
  const { currentUser } = useAuth();
  return (
    <>
      <div className='pt-8 overflow-y-scroll  pr-8 flex flex-col select-none ease-linear duration-150'>
        {/*Names */}
        <Accordion variant='separated' defaultValue='general'>
          <Accordion.Item value='general'>
            <Accordion.Control>General Info</Accordion.Control>
            <Accordion.Panel>
              <TextInput
                label='Display Name'
                placeholder='Enter display name'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />

              <TextInput
                label='User Name'
                placeholder='Enter User name'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextInput
                label='Title'
                placeholder='Eg. Full Stack Developer'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder='Enter bio'
                label='Bio'
                withAsterisk
              />
            </Accordion.Panel>
          </Accordion.Item>
          {/*Social Links*/}
          <Accordion.Item value='socialLinks'>
            <Accordion.Control>Social Links</Accordion.Control>
            <Accordion.Panel>
              <div className='space-y-4'>
                <TextInput
                  icon={<TbBrandTwitter />}
                  label='Twitter'
                  placeholder='Paste your twitter profile url'
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
                <TextInput
                  icon={<TbBrandGithub />}
                  label='GitHub'
                  placeholder='Paste your github profile url'
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
                <TextInput
                  icon={<TbBrandLinkedin />}
                  label='LinkedIn'
                  placeholder='Paste your linkedin profile url'
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
                <TextInput
                  icon={<SiInstagram />}
                  label='Instagram'
                  placeholder='Paste your instagram profile url '
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
                <TextInput
                  icon={<TbBrandYoutube />}
                  label='YouTube'
                  placeholder='Paste your YouTube channel url'
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
                <TextInput
                  icon={<TbMail />}
                  label='Email'
                  placeholder='Paste your email'
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value='otherLinks'>
            <Accordion.Control>Other Links</Accordion.Control>
            <Accordion.Panel>
              <div className='flex flex-col gap-4'>
                {otherLinks?.map((item) => (
                  <div className='flex flex-row space-x-2'>
                    <div className='w-full flex justify-between items-center text-gray-50/70 hover:brightness-125 ease-linear duration-150 active:scale-95 flex-row bg-gray-800/90 p-2 px-3 rounded-md'>
                      <div>{item?.title ?? title}</div>
                      <div>
                        <FiLink />
                      </div>
                    </div>
                    <Button
                      variant='danger'
                      onClick={() => deleteOtherLink(item)}
                    >
                      Del
                    </Button>
                  </div>
                ))}
                <Button onClick={() => setOpenNewLinkModal(true)}>
                  Add New Link
                </Button>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <AddLinkModal
        opened={openNewLinkModal}
        onClose={() => setOpenNewLinkModal(false)}
      />
    </>
  );
};

export default InfoControls;
