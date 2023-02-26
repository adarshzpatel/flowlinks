import React, { useEffect, useState } from "react";
import Preview from "../components/Builder/Preview";
import { useAuth } from "../context/AuthContext";
import { checkIsInitialized } from "../flow/scripts";
import Button from "../components/ui/Button";
import { mintNFT } from "../flow/transactions";
import InfoControls from "../components/Builder/InfoControls";
import StyleControls from "../components/Builder/StyleControls";
import { Modal } from "@mantine/core";
import Router from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

import { Tabs } from "@mantine/core";

export type LinkType = {
  title: string;
  href: string;
};

const Builder = () => {
  const [tab, setTab] = useState("Details");
  const { currentUser } = useAuth();
  const [mintModal, setMintModal] = useState<boolean>(false);
  useEffect(() => {
    if (currentUser?.addr) checkIsInitialized(currentUser?.addr);
  }, [currentUser]);
  const { logIn, logOut } = useAuth();
  const user = useUser();
  const saveForLater = async () => {};
  return (
    <>
      <div className=' text-white grid grid-cols-2 section__height'>
        <div>
          <div className='p-2 mt-4 mr-8 select-none'>
            <Tabs color='teal' variant='outline' defaultValue='gallery'>
              <Tabs.List>
                <Tabs.Tab value='Details' onClick={() => setTab("Details")}>
                  Details
                </Tabs.Tab>
                <Tabs.Tab value='Themes' onClick={() => setTab("Themes")}>
                  Themes
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>

          {tab === "Details" && (
            <>
              <InfoControls />
            </>
          )}
          {tab === "Themes" && <StyleControls />}
          <div className='w-full flex justify-center items-center pt-10 mb-10'>
            <Button
              onClick={() => {
                setMintModal(true);
              }}
              variant='primary'
            >
              Mint this NFT
            </Button>
          </div>
        </div>
        <Preview />
      </div>
      <Modal
        opened={mintModal}
        onClose={() => setMintModal(false)}
        title='Mint'
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div className='flex flex-col w-full h-full justify-center items-center gap-3 p-10'>
          <Button
            onClick={() => {
              if (currentUser.addr) mintNFT(currentUser?.addr);
              else {
                logIn();
              }
            }}
            variant='success'
          >
            {currentUser.addr ? "Mint Now" : "Connect wallet and Mint now"}
          </Button>
          <Button
            onClick={() => {
              if (user) saveForLater();
              else {
                Router.push("/auth");
              }
            }}
            variant='secondary'
          >
            {user ? "Save for later" : "Sign-in and Save for later"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Builder;
