import React from "react";

type props = {
  text:string,
  textSize:string
}
const ClaimBtn:React.FC<props> = ({text,textSize}) => {
  return (
    <button className={`relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium hover:text-zinc-900 border-zinc-300 hover:bg-zinc-900/40   bg-zinc-800/20 text-zinc-300 rounded-md whitespace-nowrap cursor-pointer duration-200 ease-out hover:scale-[1.02] disabled:shadow-none disabled:brightness-75  hover:disabled:scale-[1]  active:scale-95  outline-none group `+textSize}>
      <span className='absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-flow-800 via-flow-500 to-flow-900 group-hover:opacity-100'></span>
      <span className='absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3'></span>
      <span className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5'></span>
      <span className='absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5'></span>
      <span className='absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5'></span>
      <span className='absolute inset-0 w-full h-full border border-white rounded-md opacity-10'></span>
      <span className='absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5'></span>
      <span className='relative'>{text}</span>
    </button>
  );
};

export default ClaimBtn;
