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
import { FaArrowRight } from "react-icons/fa";

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
    let finalData = {
      id: uuid,
      owner: user?.id,
      domainname: nftConfig.username,
      avatar: nftConfig.avatar,
      cover: nftConfig.cover,
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
      styles: `${nftConfig?.avatarStyle || "square"}/${
        nftConfig?.userBgColor || ""
      }/${nftConfig?.userTheme}`,
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
      <div className=" text-white mb-8 grid grid-cols-2 section__height">
        <div className="relative flex flex-col ">
          <div className="p-2 mt-4 mr-8 select-none">
            <Tabs  variant="default" defaultValue="Details">
              <Tabs.List>
                <Tabs.Tab value="Details" onClick={() => setTab("Details")}>
                  Details
                </Tabs.Tab>
                <Tabs.Tab value="Themes" onClick={() => setTab("Themes")}>
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

          <button
            onClick={() => {
              setMintModal(true);
            }}
            className="flex text-xl tracking-wider heading  mr-10 my-8   gap-2 items-center justify-center w-full px-6 py-3 text-center text-flow-500  bg-flow-900/10 border border-flow-500 group duration-100 hover:scale-105 font-semibold rounded-xl focus:outline-none lg:w-auto "
            >
            Mint this NFT{" "}
            <FaArrowRight
              style={{ fill: "#00ef8b" }}
              className="group-hover:translate-x-2 duration-200 ease-out"
              />
          </button>
        </div>
        <Preview />
      </div>
      <Modal
        opened={mintModal}
        onClose={() => setMintModal(false)}
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        radius={"lg"}
      >
        <div className="flex flex-col w-full h-full   gap-3 ">
          <Button
            loading={loading}
            onClick={() => {
              if (currentUser.addr) {
                setLoading(true);
                mintNFT(currentUser.addr, {
                  avatar: nftConfig.avatar,
                  bio: nftConfig.bio,
                  displayName: nftConfig.displayName,
                  domainName: nftConfig.username,
                  title: nftConfig.title,
                  cover: nftConfig.cover,
                  otherLinks: nftConfig.otherLinks,
                  socialLinks: {
                    linkedIn: nftConfig.linkedin,
                    instagram: nftConfig.instagram,
                    twitter: nftConfig.twitter,
                    github: nftConfig.github,
                    youtube: nftConfig.youtube,
                    mail: nftConfig.gmail,
                  },
                  styles: {
                    background: nftConfig.userBgColor,
                    theme: `${nftConfig.userTheme}`,
                    avatar: nftConfig.avatarStyle,
                    card: "rounded",
                  },
                });
                setLoading(false);
              } else {
                logIn();
              }
            }}
            variant="none"
            className="bg-gray flex items-center justify-center bg-gray-800/50 !rounded-lg heading border hover:border-flow-600 hover:text-flow-500 hover:bg-flow-900/10 duration-200 ease-out border-gray-700 !text-2xl font-medium !p-8  text-gray-400"
          >
            {currentUser.addr ? "Mint Now" : "Connect wallet and Mint now"}
          </Button>
          <Button
            loading={loading}
            onClick={() => {
              if (user) saveForLater();
              else {
                Router.push("/auth?redirectTo=builder");
              }
            }}
            variant="none"
            className="bg-gray flex items-center justify-center bg-gray-800/50 !rounded-lg heading border hover:border-flow-600 hover:text-flow-500 hover:bg-flow-900/10 duration-200 ease-out border-gray-700 !text-2xl font-medium !p-8  text-gray-400"
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
