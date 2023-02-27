import Link from "next/link";
import React from "react";
import { FiLink } from "react-icons/fi";


const Logo = () => {
  return (
    <Link href={"/"}>
      <div className='flex flex-row justify-center items-center group active:scale-95 ease-linear duration-150'>
        <div className='text-2xl heading tracking-wider font-semibold text-flow-500  group-hover:text-white  ease-linear duration-150'>
          FlowLinks
        </div>
      </div>
    </Link>
  );
};

export default Logo;
