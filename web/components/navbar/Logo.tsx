import Link from "next/link";
import React from "react";

//React Icons
import { SiChainlink } from "react-icons/si";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className='flex flex-row justify-center items-center group active:scale-95 ease-linear duration-150'>
        <div className='pr-2 text-flow-500 group-hover:scale-110 group-hover:text-flow-400  ease-linear duration-150'>
          <SiChainlink size={30} />
        </div>
        <div className='text-3xl font-bold text-zinc-200 group-hover:text-white  ease-linear duration-150'>
          FlowLinks
        </div>
      </div>
    </Link>
  );
};

export default Logo;
