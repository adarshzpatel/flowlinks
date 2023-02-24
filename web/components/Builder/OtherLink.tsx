import Link from "next/link";
import React from "react";
import { FiLink } from "react-icons/fi";

type Props = {
  title: string;
  link: string;
};
const OtherLink:React.FC<Props> = ({title,link}) => {
  return (
    <Link href={link}>
      <div className='flex justify-between items-center text-gray-400 hover:text-gray-100 duration-150 active:scale-95 flex-row mt-2 bg-gray-800 p-2 px-3 rounded-md'>
        <div>{title}</div>
        <div>
          <FiLink />
        </div>
      </div>
    </Link>
  );
};

export default OtherLink;
