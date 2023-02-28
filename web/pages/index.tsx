import type { NextPage } from "next";
import Card from "../components/Builder/Card";
import Tilt from "react-parallax-tilt";
import { Text, Timeline, Title } from "@mantine/core";
import { TbBrandGithub } from "react-icons/tb";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import AppContainer from "../layouts/AppContainer";

const Home: NextPage = () => {
  return (
    <AppContainer>
      <div className="flex section__height ">
        <div className="flex flex-col justify-center items-center px-8 py-8 md:px-12 lg:flex-row lg:px-24">
          <div className="w-full mx-auto lg:max-w-6xl">
            <div className="max-w-xl text-center lg:p-10 lg:text-left">
              <div>
                <p className="text-4xl heading   lg:text-6xl font-semibold">
                Empower  Your  Online  Presence  <span className="text-flow-500 heading"> with  FlowLinks </span>
                </p>
                <p className="max-w-xl mt-4 text-lg lg:text-2xl tracking-tight text-gray-400">
                Own & Showcase all your links at one place , powered by NFTs on <a href="https://flow.com/" className="underline underline-offset-8 decoration-gray-700 hover:text-flow-500 font-medium relative">  Flow blockchain </a>
                </p>{" "}
              </div>
              <div className="flex flex-col gap-3 mt-10 sm:flex-row">
                <a
                  className="inline-flex  text-xl tracking-wider heading  gap-2 items-center justify-center w-full px-6 py-3 text-center text-flow-500  bg-flow-900/10 border border-flow-500 group duration-100 hover:scale-105 font-semibold rounded-xl focus:outline-none lg:w-auto "
                  href="builder"
                >
                  Claim your FlowLink <FaArrowRight style={{fill:"#00ef8b"}} className="group-hover:translate-x-2 duration-200 ease-out"/>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gradient-to-br  from-flow-500 to-flow-800 flex-1">
          <Tilt>
            <Card
              minted={false}
              displayName="Your Name"
              username="username"
              title="Eg. Full Stack Developer"
              bio="Your description goes here"
              twitter="https:www.twitter.com/"
              github="https:www.github.com/"
              linkedin="https:www.linkedin.com"
              instagram="https:www.instagram.com"
              youtube="https:www.youtube.com"
              gmail="mail"
              otherLinks={[
                {title:'Link 1',href:'https://www.example.com'},
                {title:'Link 2',href:'https://www.example.com'}
              ]}
              avatarStyle='rounded-md'
              avatar=""
              cover=""
              theme="#e4e4e7 #a1a1aa #3f3f46 #27272a"
            />
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
    </AppContainer>
  );
};

export default Home;
