import Image from "next/image";
import React from "react";
import flow_logo from "../../public/flow_logo.svg";
const ShowcaseFooter = () => {
  return (
    <div className='w-full text-lg flex flex-row space-x-2 p-2 px-4 bg-zinc-900/40 shadow-xl shadow-black/20 text-zinc-50/90 rounded-lg hover:scale-105 active:scale-95 ease-linear duration-150 group hover:text-white'>
      <div className="heading font-medium tracking-wide"> FlowLinks</div>{" "}
      <div className='text-zinc-50/70 group-hover:text-zinc-50/90 ease-linear duration-150'>
        Powered By
      </div>
      <div className="text-white ">
        <Image src={flow_logo} alt="asd" height={30}/>
      </div>
    </div>
  );
};

export default ShowcaseFooter;
