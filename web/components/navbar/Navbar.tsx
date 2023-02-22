import React from "react";
import ClaimBtn from "../buttons/ClaimBtn";
import Logo from "./Logo";
import Link from "next/link";
import Button from "../ui/Button";
import { FiArrowRight } from "react-icons/fi";

//Components

const Navbar = () => {
  
  return (
    <header className="px-8 py-4 sticky top-0 backdrop-blur-xl z-50 border-b border-b-gray-800">
    <nav className="flex max-w-screen-2xl items-center mx-auto justify-between">
        <Logo />
        <div className='flex flex-row space-x-1'>
          <Link href={"/builder"}>
          {/* <ClaimBtn
            text="Connect Wallet"
            textSize="text-base"
            /> */}
    <Button icon={<FiArrowRight/>}  variant="primary">Claim FlowLink 
    </Button>
            </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
