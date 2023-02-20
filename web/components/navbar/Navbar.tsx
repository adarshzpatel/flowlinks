import React from "react";
import ClaimBtn from "../buttons/ClaimBtn";
import Logo from "./Logo";

//Components

const Navbar = () => {
  return (
    <header className='px-8 py-4 sticky top-0 backdrop-blur-xl z-50'>
      <nav className='flex max-w-screen-lg mx-auto justify-between'>
        <Logo />
        <div className='flex flex-row space-x-1'>
          <ClaimBtn
            text="Connect Wallet"
            textSize="text-base"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
