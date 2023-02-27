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
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useControls } from "../store/useControls";
import toast from "react-hot-toast";

import { Tabs } from "@mantine/core";

export type LinkType = {
  title: string;
  href: string;
};

const Builder = () => {
  const [tab, setTab] = useState("Details");
  const { currentUser } = useAuth();
  const [mintModal, setMintModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser?.addr) checkIsInitialized(currentUser?.addr);
  }, [currentUser]);

  const { logIn } = useAuth();
  const user = useUser();

  const nftConfig = useControls();
  const supabase = useSupabaseClient();

  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  const saveForLater = async () => {
    console.log("inside save for later")
    let finalData = {
      id: uuid,
      owner: user?.id,
      domainname: nftConfig.username,
      title: nftConfig.title,
      bio: nftConfig.bio,
      displayname: nftConfig.displayName,
      github: nftConfig.github,
      linkedin: nftConfig.linkedin,
      twitter: nftConfig.twitter,
      youtube: nftConfig.youtube,
      instagram: nftConfig.instagram,
      otherlinks: nftConfig.otherLinks
        .map((val) => `${val?.title}-${val?.href}`)
        .join(","),
      styles: `${nftConfig?.avatarStyle || "square"}-${nftConfig?.userBgColor || ""}-${nftConfig.userTheme}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    try {
      setLoading(true);
      let { error } = await supabase.from("nfts").insert(finalData);
      if (error) throw error;
      toast("NFT saved successfully!");
    } catch (error) {
      toast("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
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
          <div className='w-full flex justify-center items-center pt-10 pr-8 mb-10'>
            <button
              onClick={() => {
                setMintModal(true);
              }}
              className="p-4 bg-flow-500 hover:bg-flow-600 active:scale-95 text-black text-xl font-bold uppercase hover: w-full"
            >
              Mint this NFT
            </button>
          </div>
        </div>
        <Preview />
      </div>
      <Modal
        opened={mintModal}
        onClose={() => setMintModal(false)}
        title="Mint"
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div className="flex flex-col w-full h-full justify-center items-center gap-3 p-10">
          <Button
            loading={loading}
            onClick={() => {
              if (currentUser.addr){
                setLoading(true)
                 mintNFT(currentUser.addr,{avatar:nftConfig.avatar,bio:nftConfig.bio,displayName:nftConfig.displayName,domainName:nftConfig.username,title:nftConfig.title,cover:nftConfig.cover,otherLinks:nftConfig.otherLinks,socialLinks:{
                  linkedIn:nftConfig.linkedin,
                  instagram:nftConfig.instagram,
                  twitter:nftConfig.twitter,
                  github:nftConfig.github,
                  youtube:nftConfig.youtube,
                  mail:nftConfig.gmail
                 },
                 styles:{
                    background:nftConfig.userBgColor,
                    theme:`${nftConfig.userTheme}`,
                    avatar:nftConfig.avatarStyle,
                    card:"rounded"
                 }})
                 setLoading(false)
                 ;}
              else {
                logIn();
              }
            }}
            variant="success"
          >
            {currentUser.addr ? "Mint Now" : "Connect wallet and Mint now"}
          </Button>
          <Button
            loading={loading}
            onClick={() => {
              console.log("clikced")
              if (user) saveForLater();
              else {
                Router.push("/auth");
              }
            }}
            variant="secondary"
          >
            {user
              ? loading
                ? "Saving..."
                : "Save for later"
              : "Sign-in and Save for later"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Builder;
