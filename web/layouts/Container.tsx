import React from "react";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";

const Container = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>FlowLinks - Showcase all your links</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className=''>
        <Navbar />
        <div className='max-w-screen-2xl  mx-auto px-8 '>
          {children}
        </div>
      </div>
    </>
  );
};

export default Container;
