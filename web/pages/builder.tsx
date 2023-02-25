import React, { useState } from "react";
import Controls from "../components/Builder/Controls";
import Preview from "../components/Builder/Preview";
import Card_Controls from "../components/Builder/Card_Controls";
import Button from "../components/ui/Button";
import AddLinkModal from "../components/Builder/AddLinkModal";
import { useAuth } from "../context/AuthContext";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Builder = () => {
  const [tab, setTab] = useState("Details");

  //Controls
  const [displayName, setDisplayName] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [title, setTitle] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [bio, setBio] = useState<string>("");
  const [model, setModel] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const router = useRouter();

  const { currentUser, logIn } = useAuth();
  const user = useUser();

  const mintNFT = async () => {};
  const saveForLater = async () => {};

  return (
    <>
      <div className=" text-white grid grid-cols-2 section__height">
        <div>
          <div className="flex flex-row max-w-min space-x-2 p-2 mt-4 mr-8 rounded-md bg-gray-800/50 border-gray-800 select-none">
            <button
              className={`hover:bg-gray-700/80 bg-gray-800 rounded-md ease-linear  p-1 px-4
              ${tab === "Details" ? "bg-emerald-500 text-black" : ""}`}
              onClick={() => setTab("Details")}
            >
              Details
            </button>
            <button
              className={`hover:bg-gray-700/80 bg-gray-800 rounded-md ease-linear  p-1 px-4
              ${tab === "Themes" ? "bg-emerald-500 text-black" : ""}`}
              onClick={() => setTab("Themes")}
            >
              Themes
            </button>
          </div>
          {tab === "Details" && (
            <Controls
              displayName={displayName}
              setDisplayName={setDisplayName}
              username={username}
              setUserName={setUserName}
              title={title}
              setTitle={setTitle}
              avatar={avatar}
              setAvatar={setAvatar}
              bio={bio}
              setBio={setBio}
              model={model}
              setModel={setModel}
            />
          )}
          {tab === "Themes" && <Card_Controls />}
          <div className="w-full flex justify-center items-center pt-10">
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              variant="primary"
            >
              Mint this NFT
            </Button>
          </div>
        </div>
        <Preview />
      </div>
      <AddLinkModal
        isOpen={showModal}
        closeModal={function (): void {
          setShowModal(!showModal);
        }}
        size="sm"
      >
        <div className="flex flex-col w-full h-full justify-center items-center gap-3 p-10">
          <Button
            onClick={() => {
              if (currentUser.addr) mintNFT();
              else {
                logIn();
                mintNFT();
              }
            }}
            variant="success"
          >
            {currentUser.addr ? "Mint Now" : "Connect wallet and Mint now"}
          </Button>
          <Button
            onClick={() => {
              if (user) saveForLater();
              else {
                router.push("/auth");
              }
            }}
            variant="secondary"
          >
            {user ? "Save for later" : "Sign-in and Save for later"}
          </Button>
        </div>
      </AddLinkModal>
    </>
  );
};

export default Builder;
