import {
  ActionIcon,
  CopyButton,
  Button as MantineButton,
  Tabs,
  Title,
  Tooltip,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TbCopy } from "react-icons/tb";
import { FiCheck } from "react-icons/fi";
import { getOwnedLinks } from "../flow/scripts";
import { FlowLinkResponse } from "../flow/types";
import Spinner from "../components/ui/Spinner";
import Link from "next/link";
import Button from "../components/ui/Button";

type Props = {};

const DashboardPage = (props: Props) => {
  const { currentUser } = useAuth();

  const [ownedNFTs, setOwnedNFTs] = useState<FlowLinkResponse[]>([]);
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await getOwnedLinks(currentUser?.addr);
        setOwnedNFTs(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser?.addr) getData();
  }, [currentUser]);
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
          <Tabs.Tab value="mintLater">Mint Later</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="owned" pt="lg">
          <div className="flex flex-col gap-4">
            {loading && (
              <div className="flex gap-2 items-center">
                <Spinner /> Loading NFTs...
              </div>
            )}
            {!loading &&
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
            {!loading && ownedNFTs.length === 0 && (
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
          Messages tab content
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
