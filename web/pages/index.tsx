import type { NextPage } from "next";
import Card from "../components/Builder/Card";
import Tilt from "react-parallax-tilt";
import { Container } from "@mantine/core";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex section__height ">
        <div className="flex flex-col justify-center flex-1 px-8 py-8 md:px-12 lg:flex-none lg:px-24">
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
                  className="inline-flex gap-4 items-center justify-center w-full px-6 py-3 text-center text-black duration-200 bg-flow-500 active:scale-95 duration-100 hover:scale-105 font-medium rounded-xl focus:outline-none lg:w-auto "
                  href="builder"
                  >
                  Claim your FlowLink
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Tilt>
          <Card />
        </Tilt>
      </div>
      </>
  );
};

export default Home;
