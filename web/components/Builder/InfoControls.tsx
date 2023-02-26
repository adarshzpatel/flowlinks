import React, { useState } from "react";
import AddLinkModal from "./AddLinkModal";
import { Accordion } from "@mantine/core";

//React Icons
import { TextInput } from "@mantine/core";
import { Textarea } from "@mantine/core";
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandYoutube,
  TbMail,
} from "react-icons/tb";
import Button from "../ui/Button";
import { useControls } from "../../store/useControls";
import OtherLink from "./OtherLink";

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
    setDisplayName,
    username,
    setUserName,
    title,
    setTitle,
    otherLinks,
  } = useControls();
  const [openNewLinkModal, setOpenNewLinkModal] = useState<boolean>(false);
  return (
    <>
      <div className="pt-8 overflow-y-scroll  pr-8 flex flex-col select-none ease-linear duration-150">
        {/*Names */}
        <Accordion variant="separated" defaultValue="general">
          <Accordion.Item value="general">
            <Accordion.Control>General Info</Accordion.Control>
            <Accordion.Panel>
              <TextInput
                label="Display Name"
                placeholder="Enter display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />

              <TextInput
                label="User Name"
                placeholder="Enter User name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextInput
                label="Title"
                placeholder="Eg. Full Stack Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea placeholder="Enter bio" label="Bio" withAsterisk />
            </Accordion.Panel>
          </Accordion.Item>
          {/*Social Links*/}
          <Accordion.Item value="socialLinks">
            <Accordion.Control>Social Links</Accordion.Control>
            <Accordion.Panel>
              <div className="space-y-4">
                <TextInput
                  icon={<TbBrandTwitter />}
                  label="Twitter"
                  placeholder="Paste "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextInput
                  icon={<TbBrandLinkedin />}
                  label="LinkedIn"
                  placeholder="Paste your linkedIn link"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextInput
                  icon={<TbBrandYoutube />}
                  label="Youtube"
                  placeholder="Paste your youtube link "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextInput
                  icon={<TbBrandGithub />}
                  label="LinkedIn"
                  placeholder="Paste your github link"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextInput
                  icon={<TbMail />}
                  label="Email"
                  placeholder="Paste your email"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="otherLinks">
            <Accordion.Control>Other Links</Accordion.Control>
            <Accordion.Panel>
              <div className="flex flex-col gap-4">
                {otherLinks?.map((item) => (
                  <OtherLink
                    title={item?.title ?? ""}
                    link={item?.href ?? ""}
                  />
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
