import React from "react";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";

const Container = ({ children }: any) => {
  return (
    <div>
      <Head>
        <title>Flowlinks</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className=''>
        <Navbar />
        <div className='max-w-screen-lg mx-auto p-8 xl:px-0'>{children}</div>
      </div>
    </div>
  );
};

export default Container;
