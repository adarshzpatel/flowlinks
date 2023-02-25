import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

import Container from "../layouts/Container";
import Controls from "../components/Builder/InfoControls";
import Preview from "../components/Builder/Preview";
import Card_Controls from "../components/Builder/StyleControls";
import { useAuth } from "../context/AuthContext";
import { checkIsInitialized } from "../flow/scripts";
import Button from "../components/ui/Button";
import { mintNFT } from "../flow/transactions";
import InfoControls from "../components/Builder/InfoControls";
import StyleControls from "../components/Builder/StyleControls";

export type LinkType = {
  title: string;
  href: string;
};

const Builder = () => {
  const [tab, setTab] = useState("Details");
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser?.addr) checkIsInitialized(currentUser?.addr);
  }, [currentUser]);

  return (
    <Container>
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
            <InfoControls/>
          )}
          {tab === "Themes" && <StyleControls />}
        </div>
        <Preview />
      </div>
    </Container>
  );
};

export default Builder;
