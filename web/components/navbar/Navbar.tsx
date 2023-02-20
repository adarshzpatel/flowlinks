import React from "react";
import Logo from "./Logo";

//Components

const Navbar = () => {
  return (
    <header className='px-8 py-4 sticky top-0 backdrop-blur-xl z-50'>
      <nav className='flex max-w-screen-lg mx-auto justify-between'>
        <Logo />
        <div className='flex flex-row space-x-1'>
          <button className='border shadow-lg hover:shadow-xl hover:text-flow-200 border-flow-400 hover:bg-flow-900/40   bg-flow-900/20 text-flow-400  px-4 py-2 text-base rounded-md font-medium whitespace-nowrap cursor-pointer duration-200 ease-out hover:scale-[1.02] disabled:shadow-none disabled:brightness-75  hover:disabled:scale-[1]  active:scale-95  outline-none'>
            Claim Your Flowlink
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
