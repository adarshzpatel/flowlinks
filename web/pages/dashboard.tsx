import { ActionIcon, CopyButton, Tabs, Title, Tooltip } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TbCopy } from "react-icons/tb";
import { FiCheck } from "react-icons/fi";
import { getOwnedLinks } from "../flow/scripts";
import { FlowLinkResponse } from "../flow/types";
import Spinner from "../components/ui/Spinner";
import Link from "next/link";
import Button from "../components/ui/Button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import Card from "../components/Builder/Card";

const DashboardPage = () => {
  const supabase = useSupabaseClient();
  const { currentUser } = useAuth();
  const user = useUser();
  const [ownedNFTs, setOwnedNFTs] = useState<FlowLinkResponse[]>([]);
  const [savedNfts, setSavedNfts] = useState<FlowLinkResponse[]>([]);
  const [loadingMintedNfts, setLoadingMintedNfts] = useState<boolean>();
  const [loadingSavedNfts, setLoadingSavedNfts] = useState<boolean>();

  const [ownedNFTDomains, setOwnedNFTDomains] = useState<Array<string>>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingMintedNfts(true);
        const res = await getOwnedLinks(currentUser?.addr);
        setOwnedNFTs(res);
        const domains = res.map((val: any) => val.domainName);
        setOwnedNFTDomains(domains);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingMintedNfts(false);
      }
    };
    if (currentUser?.addr) getData();
  }, [currentUser]);

  const getSavedNFTs = async () => {
    try {
      setLoadingSavedNfts(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("nfts")
        .select("*")
        .eq("owner", user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        let temp: FlowLinkResponse[] = [];
        for (let nft of data) {
          const styles = nft.styles.split("/");
          let otherLinks = nft.otherlinks.split(",");
          let finalOtherLinks = [];
          if (otherLinks.length && otherLinks[0] !== "") {
            finalOtherLinks = otherLinks.map((val: string) => ({
              title: val.split("-")[0],
              href: val.split("-")[1],
            }));
          }
          temp.push({
            id: nft.id,
            avatar: nft.avatar,
            bio: nft.bio,
            cover: nft.cover,
            displayName: nft.displayname,
            domainName: nft.domainname,
            owner: nft.owner,
            title: nft.title,
            socialLinks: {
              github: nft.github,
              linkedin: nft.linkedin,
              instagram: nft.instagram,
              twitter: nft.twitter,
              youtube: nft.youtube,
              mail: nft.gmail,
            },
            otherLinks: finalOtherLinks,
            styles: {
              avatar: styles[0],
              background: styles[1],
              theme: styles[2],
              card: "rounded",
            },
          });
        }
        setSavedNfts(temp);
      }
    } catch (error) {
      toast("Error loadingMintedNfts saved nfts!");
      console.log(error);
    } finally {
      setLoadingSavedNfts(false);
    }
  };

  useEffect(() => {
    if (user) getSavedNFTs();
  }, [user]);

  return (
    <div className="py-8 max-w-screen-lg mx-auto">
      <div className="flex justify-between my-4 items-center gap-2">
        <Title>Dashboard</Title>
        <div className="border-gray-600 flex items-center border bg-gray-800 text-xl  pl-4 py-2 gap-2 pr-4 rounded-md">
          {currentUser?.addr}
          <CopyButton value={currentUser?.addr} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon
                  size={28}
                  color={copied ? "flow" : "gray"}
                  onClick={copy}
                >
                  <div className="p-2">
                    {copied ? <FiCheck size={24} /> : <TbCopy size={24} />}
                  </div>
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </div>
      </div>
      <Tabs defaultValue="owned" radius={"md"}>
        <Tabs.List>
          <Tabs.Tab value="owned">Owned</Tabs.Tab>
          <Tabs.Tab value="mintLater">Saved</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="owned" pt="lg">
          <div className="flex flex-col gap-4">
            {loadingMintedNfts && (
              <div className="flex gap-2 items-center">
                <Spinner /> LoadingMintedNfts NFTs...
              </div>
            )}
            {!loadingMintedNfts &&
              ownedNFTs?.map((item) => (
                <div
                  className="p-4 hover:border-l-2  hover:border-l-flow-500 duration-100 flex items-center gap-4 rounded-lg  bg-gray-800/50  border border-gray-700"
                  key={`flowlink-${item.domainName}`}
                >
                  <div className="font-bold text-2xl flex-1">
                    @ {item?.domainName}
                  </div>
                  <Link
                    href={"https://flowlinks.vercel.app/@" + item?.domainName}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="success">View Flowlink</Button>
                  </Link>
                  <Link
                    href={
                      "https://flowlinks.vercel.app/edit/" + item?.domainName
                    }
                  >
                    <Button variant="warning">Edit </Button>
                  </Link>

                  <CopyButton
                    value={"https://flowlinks.vercel.app/@" + item?.domainName}
                    timeout={2000}
                  >
                    {({ copied, copy }) => (
                      <div className="flex ga items-center border border-gray-600 py-2 px-4 rounded-lg">
                        {copied ? "Copied" : "Copy Share link"}
                        <ActionIcon
                          size={28}
                          color={copied ? "flow" : "gray"}
                          onClick={copy}
                        >
                          <div className="p-2 ">
                            {copied ? (
                              <FiCheck size={24} />
                            ) : (
                              <TbCopy size={24} />
                            )}
                          </div>
                        </ActionIcon>
                      </div>
                    )}
                  </CopyButton>
                </div>
              ))}
            {!loadingMintedNfts && ownedNFTs.length === 0 && (
              <div className="text-xl text-gray-400">
                You don't own any flowlinks{" "}
                <Link
                  href={"/builder"}
                  className="text-medium underline text-gray-100 hover:text-flow-500 underline-offset-4"
                >
                  Click Here to mint one
                </Link>
              </div>
            )}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="mintLater" pt="lg">
          <div className="flex w-full gap-4 flex-wrap justify-around p-4 overflow-y-auto">
            {!loadingSavedNfts &&
              savedNfts.map((nft: FlowLinkResponse, idx) => {
                return (
                  <Card
                    theme={nft.styles.theme || ""}
                    username={nft.domainName}
                    twitter={nft.socialLinks.twitter || ""}
                    github={nft.socialLinks.github || ""}
                    linkedin={nft.socialLinks.linkedin || ""}
                    instagram={nft.socialLinks.instagram || ""}
                    youtube={nft.socialLinks.youtube || ""}
                    gmail={nft.socialLinks.mail || ""}
                    avatarStyle={nft.styles.avatar || ""}
                    key={idx}
                    minted={ownedNFTDomains.includes(nft.domainName)}
                    {...nft}
                  />
                );
              })}
            {!user && "Please sign-in to view your saved NFTs."}
            {savedNfts.length === 0 && "You haven't saved any NFT designs yet."}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
