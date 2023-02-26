import type { NextPage } from "next";
import Card from "../components/Builder/Card";
import Tilt from "react-parallax-tilt";
import { Container, Text, Timeline, Title } from "@mantine/core";
import { TbBrandGithub } from "react-icons/tb";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex section__height ">
        <div className="flex flex-col justify-center items-center px-8 py-8 md:px-12 lg:flex-row lg:px-24">
          <div className="w-full mx-auto lg:max-w-6xl">
            <div className="max-w-xl text-center lg:p-10 lg:text-left">
              <div>
                <p className="text-5xl tracking-tighter text-flow-500 lg:text-6xl font-bold">
                  Showcase all your links in one place .
                </p>
                <p className="max-w-xl mt-4 text-lg lg:text-3xl tracking-tight text-gray-400">
                  Our SaaS programming product offers a powerful platform that
                  makes coding easier, faster and more efficient.We understand
                  the fast-paced nature of the tech industry, and our software
                  is built to keep up.
                </p>{" "}
              </div>
              <div className="flex flex-col gap-3 mt-10 sm:flex-row">
                <a
                  className="inline-flex gap-4 items-center justify-center w-full px-6 py-3 text-center text-black  bg-flow-500 active:scale-95 duration-100 hover:scale-105 font-medium rounded-xl focus:outline-none lg:w-auto "
                  href="builder"
                >
                  Claim your FlowLink
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-1">
          <Tilt>
            {/* <Card/> */}
          </Tilt>
        </div>
      </div>
      <div className="flex flex-col gap-8 px-32 pb-16 justify-center">
        <Title>Roadmap</Title>
        <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item
            bullet={<div className="bg-gray-900" />}
            title="Build & Launch on MVP on Testnet"
          >
            <Text color="dimmed" size="sm">
              with basic functions for hackathon
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<div className="bg-gray-900 h-full w-full rounded-full" />}
            title="Launch Contract V2 on Testnet "
          >
            <Text color="dimmed" size="sm">
              Store styles & design items as resource
            </Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<div className="bg-gray-900" />}
            title="Walletless Onboarding"
            lineVariant="dashed"
          >
            <Text color="dimmed" size="sm">
              for smooth onboarding process
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Launch Flowlinks Marketplace "
            bullet={<div className="bg-gray-900" />}
            lineVariant="dashed"
          >
            <Text color="dimmed" size="sm">
              Trade or rent flowlinks
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Introduce accessories and new designs  "
            bullet={<div className="bg-gray-900" />}
            lineVariant="dashed"
          >
            <Text color="dimmed" size="sm">
              More customizations ...
            </Text>
          </Timeline.Item>
        </Timeline>
      <footer className="flex justify-between border-t border-gray-600 pt-8">
        <div className="font-medium text-xl text-flow-500">FlowLinks</div>
        <Link href={"https://github.com/adarshzpatel/flowlinks"} className="flex items-center gap-2 text-xl"> <TbBrandGithub/>
          Github</Link>
      </footer>
      </div>
    </>
  );
};

export default Home;
